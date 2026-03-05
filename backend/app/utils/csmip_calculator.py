import numpy as np
import copy
import pystrata
from scipy.fft import rfft, rfftfreq, irfft
import pyrotd
import pykooh
import simplejson as json

def zero_padding(accel, Ntarget):
    Ncurr = len(accel)
    if Ncurr < Ntarget:
        accel = np.asarray(sum([accel.tolist(), [0]*(Ntarget-Ncurr)], []))
    else:
        accel = accel[0:Ntarget]
    return accel

def gen_Vs_step(thick, Vs):
    steps = len(Vs)
    j = 0
    tmp = 0
    depths = np.zeros(2*steps+1)
    vels = np.zeros(2*steps+1)
    
    for i in range(steps):
        tmp = tmp + thick[i]
        depths[j+1] = tmp
        depths[j+2] = tmp
        vels[j] = Vs[i]
        vels[j+1] = Vs[i]
        j = j + 2

    return depths[:-1], vels[:-1]

def run_generate_fas(payload):
    Magnitude = float(payload.get("Magnitude", 0))
    Distance = float(payload.get("Distance", 0))
    Region = payload.get("Region", "wna")
    FAS = payload.get("FAS", [])
    Npoints = 2**14 

    freqs = np.linspace(0, 1/(2*0.005), int(Npoints/2)+1)[:-1]
    freqs[0] = .01

    m = pystrata.motion.SourceTheoryRvtMotion(magnitude=Magnitude, distance=Distance, region=Region)
    m.calc_fourier_amps(freqs=freqs)

    FAS_Data_Array = []
    Freq = m.freqs
    Amp = m.fourier_amps

    for i in range(len(Freq)):
        FAS_Data_Array.append({"x": Freq[i], "y": Amp[i]})

    if len(FAS) > 0:
        FAS[0]["data"] = FAS_Data_Array
    else:
        FAS.append({"data": FAS_Data_Array})
    return {"whether_analyzed": 2, "FAS": FAS}

def run_analyze(payload):
    Target_Depth = payload.get("Target_Depth")
    Reference_Site_Soil_Profile = payload.get("Reference_Site_Soil_Profile", [])
    Target_Site_Soil_Profile = payload.get("Target_Site_Soil_Profile", [])
    FAS_Data = payload.get("FAS", [{}])[0].get("data", [])
    Transfer_Functions = payload.get("Transfer_Functions", [])
    Max_Strain_Profile = payload.get("Max_Strain_Profile", [])

    Ref_Halfspace_Vs = payload.get("Ref_Halfspace_Vs")
    Ref_Halfspace_Damping = payload.get("Ref_Halfspace_Damping")
    Ref_Water_Table_Depth = payload.get("Ref_Water_Table_Depth")
    Tar_Halfspace_Vs = payload.get("Tar_Halfspace_Vs")
    Tar_Halfspace_Damping = payload.get("Tar_Halfspace_Damping")
    Tar_Water_Table_Depth = payload.get("Tar_Water_Table_Depth")

    Analysis_Type = payload.get("Analysis_Type")
    Tol = payload.get("Tol")          
    MaxIter = payload.get("MaxIter")        
    EffStrain = payload.get("EffStrain")    
    StrainLimit = payload.get("StrainLimit")

    Magnitude = payload.get("Magnitude")
    Distance = payload.get("Distance")          
    Region = payload.get("Region")        

    gamma_w = 9.81
    TFcutoff = 1

    Mod_Target_Site_Soil_Profile = []
    Mod_Reference_Site_Soil_Profile = Reference_Site_Soil_Profile.copy()

    Bedrock_Layer_Index = -1
    Reference_Layer_Index = 0
    Target_Layer_Index = 0

    depth = 0; prev_depth=0; layer_num=1
    for i in range(0,len(Target_Site_Soil_Profile)):
        prev_depth = depth
        depth = depth+Target_Site_Soil_Profile[i]["Thickness"]
        if(prev_depth<Target_Depth and depth>Target_Depth):
            new_layer = Target_Site_Soil_Profile[i].copy()
            new_layer["Thickness"] = (Target_Depth-prev_depth)
            Mod_Target_Site_Soil_Profile.append(new_layer)

            another_layer = Target_Site_Soil_Profile[i].copy()
            another_layer["Thickness"] = (depth-Target_Depth)            
            Mod_Target_Site_Soil_Profile.append(another_layer)
        else:
            Mod_Target_Site_Soil_Profile.append(Target_Site_Soil_Profile[i])

    # Initialize the Reference Profile
    Pystrata_Reference_Soil_Profile_Layers = []
    mid_layer_depth=0
    total_stress=0; pore_pressure =0; effective_stress=0
    Reference_Layer_Thickness=[]
    for i in range(len(Mod_Reference_Site_Soil_Profile)):
        Name = Mod_Reference_Site_Soil_Profile[i]["Name"]
        Thickness = Mod_Reference_Site_Soil_Profile[i]["Thickness"]
        Vs = Mod_Reference_Site_Soil_Profile[i]["Vs"]
        Gamma = Mod_Reference_Site_Soil_Profile[i]["Gamma"]
        PI = Mod_Reference_Site_Soil_Profile[i]["PI"]
        OCR = Mod_Reference_Site_Soil_Profile[i]["OCR"]
        Damping = Mod_Reference_Site_Soil_Profile[i]["Damping"]
        SoilModel = Mod_Reference_Site_Soil_Profile[i]["SoilModel"]

        Reference_Layer_Thickness.append(Thickness)

        mid_layer_depth = mid_layer_depth+Thickness/2.0
        total_stress = total_stress+Thickness/2.0*Gamma
        if(mid_layer_depth>=Ref_Water_Table_Depth):
            pore_pressure=gamma_w*(mid_layer_depth-Ref_Water_Table_Depth)
        effective_stress = total_stress - pore_pressure
        effective_stress = effective_stress/101.3*(1+2*0.5)/3

        if(SoilModel==1):
            Pystrata_Reference_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.SoilType(name=Name,unit_wt=Gamma, mod_reduc=None, damping=Damping), thickness=Thickness, shear_vel=Vs),)
        elif(SoilModel==2):
            Pystrata_Reference_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.DarendeliSoilType(unit_wt=Gamma,plas_index=PI,ocr=OCR,stress_mean=effective_stress), thickness=Thickness, shear_vel=Vs),)
    
    Pystrata_Reference_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.SoilType(name='Halfspace',unit_wt=22,mod_reduc=None,damping=Ref_Halfspace_Damping),thickness=0, shear_vel=Ref_Halfspace_Vs))
    Pystrata_Reference_Soil_Profile = pystrata.site.Profile(layers= Pystrata_Reference_Soil_Profile_Layers)
    Pystrata_Reference_Soil_Profile.update_layers(0)

    # Initialize the Target Profile
    Pystrata_Target_Soil_Profile_Layers = []
    Target_Layer_Index = 0
    depth =0; mid_layer_depth=0
    total_stress=0; pore_pressure =0; effective_stress=0
    Target_Layer_Thickness=[]
    for i in range(len(Mod_Target_Site_Soil_Profile)):
        Name = Mod_Target_Site_Soil_Profile[i]["Name"]
        Thickness = Mod_Target_Site_Soil_Profile[i]["Thickness"]
        Vs = Mod_Target_Site_Soil_Profile[i]["Vs"]
        Gamma = Mod_Target_Site_Soil_Profile[i]["Gamma"]
        PI = Mod_Target_Site_Soil_Profile[i]["PI"]
        OCR = Mod_Target_Site_Soil_Profile[i]["OCR"]
        Damping = Mod_Target_Site_Soil_Profile[i]["Damping"]
        SoilModel = Mod_Target_Site_Soil_Profile[i]["SoilModel"]
        depth = depth + Thickness

        Target_Layer_Thickness.append(Thickness)

        if(depth==Target_Depth):
            Target_Layer_Index=i+1

        mid_layer_depth = mid_layer_depth+Thickness/2.0
        total_stress = total_stress+Thickness/2.0*Gamma
        if(mid_layer_depth>=Ref_Water_Table_Depth):
            pore_pressure=gamma_w*(mid_layer_depth-Ref_Water_Table_Depth)
        effective_stress = total_stress - pore_pressure
        effective_stress = effective_stress/101.3*(1+2*0.5)/3

        if(SoilModel==1):
            Pystrata_Target_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.SoilType(name=Name,unit_wt=Gamma, mod_reduc=None, damping=Damping), thickness=Thickness, shear_vel=Vs),)
        elif(SoilModel==2):
            Pystrata_Target_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.DarendeliSoilType(unit_wt=Gamma,plas_index=PI,ocr=OCR,stress_mean=effective_stress), thickness=Thickness, shear_vel=Vs),)
    
    Pystrata_Target_Soil_Profile_Layers.append(pystrata.site.Layer(soil_type=pystrata.site.SoilType(name='Halfspace',unit_wt=22,mod_reduc=None,damping=Tar_Halfspace_Damping),thickness=0, shear_vel=Tar_Halfspace_Vs))
    Pystrata_Target_Soil_Profile = pystrata.site.Profile(layers= Pystrata_Target_Soil_Profile_Layers)
    Pystrata_Target_Soil_Profile.update_layers(0)
    
    # SRA
    n = len(FAS_Data)
    Freq=np.zeros(n)
    FAS_A =np.zeros(n) 
    for i in range(n):
        Freq[i] = FAS_Data[i]["x"]
        FAS_A[i]  = FAS_Data[i]["y"]

    m0 = pystrata.motion.SourceTheoryRvtMotion(Magnitude,Distance,Region)
    m0.calc_fourier_amps(freqs=Freq)

    m = pystrata.motion.RvtMotion(Freq,FAS_A, duration=m0.duration, peak_calculator="BT12", calc_kwds={
            "region": Region,
            "mag": Magnitude,
            "dist": Distance,
        })

    # Calculators
    if(Analysis_Type=="LE"):
        calc_reference = pystrata.propagation.LinearElasticCalculator()
        calc_target = pystrata.propagation.LinearElasticCalculator()
    elif(Analysis_Type=="EQL"):
        calc_reference = pystrata.propagation.EquivalentLinearCalculator(strain_ratio=EffStrain,max_iterations=MaxIter,strain_limit=StrainLimit,tolerance=Tol)
        calc_target = pystrata.propagation.EquivalentLinearCalculator(strain_ratio=EffStrain,max_iterations=MaxIter,strain_limit=StrainLimit,tolerance=Tol)

    outputs_reference = pystrata.output.OutputCollection([
        pystrata.output.FourierAmplitudeSpectrumOutput(
        Freq,
        pystrata.output.OutputLocation('outcrop', index=Reference_Layer_Index),
        ),
        pystrata.output.MaxStrainProfile()
        ])

    outputs_target = pystrata.output.OutputCollection([
        pystrata.output.FourierAmplitudeSpectrumOutput(
        Freq,
        pystrata.output.OutputLocation('outcrop', index=Target_Layer_Index),
        ),
        pystrata.output.MaxStrainProfile()
        ])

    calc_reference(m,Pystrata_Reference_Soil_Profile,Pystrata_Reference_Soil_Profile.location('outcrop', index=Bedrock_Layer_Index))
    outputs_reference(calc_reference)

    calc_target(m,Pystrata_Target_Soil_Profile,Pystrata_Target_Soil_Profile.location('outcrop', index=Bedrock_Layer_Index))
    outputs_target(calc_target)

    # Double convolution transfer function
    FAS_B = outputs_reference[0].values
    FAS_C = outputs_target[0].values

    TF1 = FAS_A/FAS_B
    TF2 = FAS_C/FAS_A
    TF = TF1*TF2

    TF1[(TF1>TFcutoff)] = TFcutoff
    TF = TF1*TF2

    # max Shear Strain Profile
    Reference_Strain = np.array(outputs_reference[1].values[:-1],dtype=float)
    Target_Strain = np.array(outputs_target[1].values[:-1],dtype=float) 

    Reference_Strain = Reference_Strain*100
    Target_Strain = Target_Strain*100

    [Reference_Layer_Depth,Reference_Max_Strain] = gen_Vs_step(Reference_Layer_Thickness,Reference_Strain)
    [Target_Layer_Depth,Target_Max_Strain] = gen_Vs_step(Target_Layer_Thickness,Target_Strain)

    Reference_Site_TF_Data_Array = []
    Target_Site_TF_Data_Array = []
    Reference_to_Target_Site_TF_Data_Array = []

    for i in range(len(Freq)):
        Reference_Site_TF_Data_Array.append({"x": Freq[i], "y": float(TF1[i])})
        Target_Site_TF_Data_Array.append({"x": Freq[i], "y": float(TF2[i])})
        Reference_to_Target_Site_TF_Data_Array.append({"x": Freq[i], "y": float(TF[i])})

    Transfer_Functions[0]["data"] = Reference_Site_TF_Data_Array
    Transfer_Functions[1]["data"] = Target_Site_TF_Data_Array
    Transfer_Functions[2]["data"] = Reference_to_Target_Site_TF_Data_Array

    Reference_Site_Max_Shear_Strain_Data_Array = []
    for i in range(len(Reference_Max_Strain)):
        Reference_Site_Max_Shear_Strain_Data_Array.append({"x": float(Reference_Max_Strain[i]), "y": float(Reference_Layer_Depth[i])})
    
    def clean_nan(arr):
        for item in arr:
            if np.isnan(item["x"]): item["x"] = None
            if np.isnan(item["y"]): item["y"] = None
        return arr
        
    Max_Strain_Profile[0]["data"] = clean_nan(Reference_Site_Max_Shear_Strain_Data_Array)

    Target_Site_Max_Shear_Strain_Data_Array = []
    for i in range(len(Target_Max_Strain)):
        Target_Site_Max_Shear_Strain_Data_Array.append({"x": float(Target_Max_Strain[i]), "y": float(Target_Layer_Depth[i])})

    Max_Strain_Profile[1]["data"] = clean_nan(Target_Site_Max_Shear_Strain_Data_Array)

    return {'whether_analyzed': 2, 'Transfer_Functions': Transfer_Functions, 'Max_Strain_Profile': Max_Strain_Profile}

def run_generate_motion(payload):
    smoothing = 1
    bexp = 30

    TF_Data = payload.get("Transfer_Functions", [{}, {}, {}])[2].get("data", [])
    if not TF_Data:
        return {"error": "Missing transfer function data"}

    TF = np.zeros(len(TF_Data))
    Freq = np.zeros(len(TF_Data))

    for i in range(len(TF_Data)):
        TF[i] = TF_Data[i]["y"]
        Freq[i] = TF_Data[i]["x"]

    Motion = payload.get("Motion", [])
    Reference_Motion_Data = Motion[1]["data"]
    Response_Spectrum = payload.get("Response_Spectrum", [])
    FA_Spectrum = payload.get("FA_Spectrum", [])

    N = len(Reference_Motion_Data)
    Reference_Motion_Time = np.zeros(N)
    Reference_Motion_Acc = np.zeros(N)

    for i in range(N):
        Reference_Motion_Time[i] = Reference_Motion_Data[i]["x"]
        Reference_Motion_Acc[i] = Reference_Motion_Data[i]["y"]

    N_update = int(2**np.ceil(np.log(N)/np.log(2)))
    Reference_Motion_Acc = zero_padding(Reference_Motion_Acc,N_update)

    dt = Reference_Motion_Time[1]-Reference_Motion_Time[0]

    xf = rfftfreq(N_update,dt)
    xf[0] = 1e-2
    Reference_Motion_yf = rfft(Reference_Motion_Acc)
    Target_Motion_yf = copy.deepcopy(Reference_Motion_yf)*np.interp(xf,Freq,TF)
    Target_Motion_Acc = irfft(Target_Motion_yf)

    Target_Motion_Acc = Target_Motion_Acc[:N]
    Reference_Motion_Acc = Reference_Motion_Acc[:N]

    Target_Motion_Motion_Data = copy.deepcopy(Reference_Motion_Data)
    for i in range(N):
        Target_Motion_Motion_Data[i]["y"] = float(Target_Motion_Acc[i])

    Motion[1]["data"] = copy.deepcopy(Reference_Motion_Data)
    Motion[0]["data"] = copy.deepcopy(Target_Motion_Motion_Data)

    Smooth_FAS_Reference_Motion = pykooh.smooth(xf,xf,Reference_Motion_yf,bexp)
    Smooth_FAS_Target_Motion = pykooh.smooth(xf,xf,Target_Motion_yf,bexp)

    xf = xf[1:]
    Smooth_FAS_Reference_Motion = Smooth_FAS_Reference_Motion[1:]
    Smooth_FAS_Target_Motion = Smooth_FAS_Target_Motion[1:]

    Target_FA_Spectrum_Data_Array = []
    Reference_FA_Spectrum_Data_Array = []
    for i in range (len(Smooth_FAS_Reference_Motion)):
        Target_FA_Spectrum_Data_Array.append({"x": float(xf[i]), "y": float(Smooth_FAS_Target_Motion[i])})
        Reference_FA_Spectrum_Data_Array.append({"x": float(xf[i]), "y": float(Smooth_FAS_Reference_Motion[i])})

    FA_Spectrum[1]["data"] = Reference_FA_Spectrum_Data_Array
    FA_Spectrum[0]["data"] = Target_FA_Spectrum_Data_Array

    damping = 0.05
    freq_range = np.logspace(-2,2,300)
    pyrotd.processes = 1
    RS_Reference_Motion = pyrotd.calc_spec_accels(dt,Reference_Motion_Acc,freq_range,damping).spec_accel
    RS_Target_Motion = pyrotd.calc_spec_accels(dt,Target_Motion_Acc,freq_range,damping).spec_accel

    Target_Response_Spectrum_Data_Array = []
    Reference_Response_Spectrum_Data_Array = []
    for i in range(len(RS_Reference_Motion)):
        Target_Response_Spectrum_Data_Array.append({"x": float(freq_range[i]), "y": float(RS_Target_Motion[i])})
        Reference_Response_Spectrum_Data_Array.append({"x": float(freq_range[i]), "y": float(RS_Reference_Motion[i])})

    Response_Spectrum[1]["data"] = Reference_Response_Spectrum_Data_Array
    Response_Spectrum[0]["data"] = Target_Response_Spectrum_Data_Array

    return {'whether_processed': 2, 'Motion': Motion, 'FA_Spectrum':FA_Spectrum, 'Response_Spectrum':Response_Spectrum }
