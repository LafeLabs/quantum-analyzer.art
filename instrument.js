

const analyzer_settings = {
  "top_grid_params": {
    "vna_source_power": {
      "label": "vector network analyzer source power",
      "value": -30,
      "unit": "dBm"
    },
    "vna_if_bandwidth": {
      "label": "vector network analyzer IF bandwidth",
      "value": 10000,
      "unit": "Hz"
    },
    "sa_resolution_bandwidth": {
      "label": "spectrum analyzer resolution bandwidth",
      "value": 1.0,
      "unit": "MHz"
    },
    "sa_video_bandwidth": {
      "label": "spectrum analyzer video bandwidth",
      "value": 10.0,
      "unit": "kHz"
    }
  },
  "inline_row_params": {
    "start_frequency": {
      "label": "start frequency",
      "value": 4.0,
      "unit": "GHz"
    },
    "stop_frequency": {
      "label": "stop frequency",
      "value": 8.0,
      "unit": "GHz"
    },
    "number_of_points": {
      "label": "number of points",
      "value": 1001,
      "unit": ""
    }
  }
};

const warm_rf_network = {
    "instrument_select": {
        "label": "Measurement Instrument Select",
        "state": "vna",
        "states": ["vna", "spectrum_analyzer"]
    },
    "s_parameter_select": {
        "label": "s matrix element select",
        "state": "s11",
        "states": ["s11", "s21", "s12", "s22", "s24", "s14", "s13", "s23", "noise_diode"]
    },
    "programmable_attenuator": {
        "label": "programmable attenuator",
        "value": -40
    }
};

const cold_rf_network = {
    "output_switch_1": {
        "label": "Cryogenic Output Switch 1",
        "state": "internal_open",
        "states": ["internal_open", "internal_short", "internal_load", "port1_output", "port2_jpa", "port3_hot_wire", "port4_sntj", "port5_short", "port6_open"]
    },
    "thru_switch_pair": {
        "label": "2 Port Device Cryogenic Switch Pair",
        "state": "internal_open",
        "states": ["internal_open", "internal_short", "internal_load", "port1_thru", "port2_reflect", "port3_line", "port4_qubit", "port5_twpa", "port6_coupler"]
    },
    "output_switch_2": {
        "label": "Cryogenic Output Switch 2",
        "state": "internal_open",
        "states": ["internal_open", "internal_short", "internal_load", "port1_output", "port2_jpa", "port3_hot_wire", "port4_sntj", "port5_short", "port6_open"]
    }
};

let pending_hardware_updates = {};

document.addEventListener("DOMContentLoaded", () => {
    // --- BUILD GLOBAL ANALYZER BLOCK ---
    const analyzerTarget = document.getElementById("analyzer-block-target");
    const analyzerFieldset = document.createElement("fieldset");
    analyzerFieldset.className = "compact-panel";
    
    const analyzerLegend = document.createElement("legend");
    analyzerLegend.textContent = "Analyzer";
    analyzerFieldset.appendChild(analyzerLegend);

    const topGridDiv = document.createElement("div");
    topGridDiv.className = "top-grid";
    Object.keys(analyzer_settings.top_grid_params).forEach(paramKey => {
        const item = analyzer_settings.top_grid_params[paramKey];
        const lbl = document.createElement("label");
        const span = document.createElement("span");
        span.textContent = item.label + ":";
        lbl.appendChild(span);

        const inp = document.createElement("input");
        inp.type = "text";
        inp.name = paramKey;
        inp.value = item.value;
        inp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = parseFloat(e.target.value);
                analyzer_settings.top_grid_params[paramKey].value = isNaN(val) ? e.target.value : val;
                pending_hardware_updates[paramKey] = analyzer_settings.top_grid_params[paramKey].value;
                console.log("Pending Queue Update:", JSON.stringify(pending_hardware_updates));
                e.target.blur();
            }
        });
        lbl.appendChild(inp);

        if (item.unit) {
            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = item.unit;
            lbl.appendChild(unit);
        }
        topGridDiv.appendChild(lbl);
    });
    analyzerFieldset.appendChild(topGridDiv);

    const inlineRowDiv = document.createElement("div");
    inlineRowDiv.className = "inline-row";
    Object.keys(analyzer_settings.inline_row_params).forEach(paramKey => {
        const item = analyzer_settings.inline_row_params[paramKey];
        const lbl = document.createElement("label");
        const span = document.createElement("span");
        span.textContent = item.label + ":";
        lbl.appendChild(span);

        const inp = document.createElement("input");
        inp.type = "text";
        inp.name = paramKey;
        inp.value = item.value;
        inp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const val = parseFloat(e.target.value);
                analyzer_settings.inline_row_params[paramKey].value = isNaN(val) ? e.target.value : val;
                pending_hardware_updates[paramKey] = analyzer_settings.inline_row_params[paramKey].value;
                console.log("Pending Queue Update:", JSON.stringify(pending_hardware_updates));
                e.target.blur();
            }
        });
        lbl.appendChild(inp);

        if (item.unit) {
            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = item.unit;
            lbl.appendChild(unit);
        }
        inlineRowDiv.appendChild(lbl);
    });
    analyzerFieldset.appendChild(inlineRowDiv);
    analyzerTarget.appendChild(analyzerFieldset);
    // --- BUILD WARM NETWORK BLOCK ---
    const warmTarget = document.getElementById("warm-network-target");
    const warmFieldset = document.createElement("fieldset");
    warmFieldset.className = "compact-panel lower-matrix";
    
    const warmLegend = document.createElement("legend");
    warmLegend.textContent = "Warm Network";
    warmFieldset.appendChild(warmLegend);

    Object.keys(warm_rf_network).forEach(warmKey => {
        const itemConfig = warm_rf_network[warmKey];
        const formLabel = document.createElement("label");
        const span = document.createElement("span");
        span.textContent = itemConfig.label + ":";
        formLabel.appendChild(span);

        if (itemConfig.states) {
            const select = document.createElement("select");
            select.name = warmKey;
            itemConfig.states.forEach(state => {
                const opt = document.createElement("option");
                opt.value = state;
                opt.textContent = state;
                if (state === itemConfig.state) opt.selected = true;
                select.appendChild(opt);
            });
            select.addEventListener("change", (e) => {
                warm_rf_network[warmKey].state = e.target.value;
                pending_hardware_updates[warmKey] = e.target.value;
                console.log("Pending Queue Update:", JSON.stringify(pending_hardware_updates));
            });
            formLabel.appendChild(select);
        } else if (itemConfig.value !== undefined) {
            formLabel.className = "full-width-field";
            const inp = document.createElement("input");
            inp.type = "text";
            inp.name = warmKey;
            inp.value = itemConfig.value;
            inp.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const val = parseFloat(e.target.value);
                    warm_rf_network[warmKey].value = isNaN(val) ? e.target.value : val;
                    pending_hardware_updates[warmKey] = warm_rf_network[warmKey].value;
                    console.log("Pending Queue Update:", JSON.stringify(pending_hardware_updates));
                    e.target.blur();
                }
            });
            const unit = document.createElement("span");
            unit.className = "unit";
            unit.textContent = "dB";
            formLabel.appendChild(inp);
            formLabel.appendChild(unit);
        }
        warmFieldset.appendChild(formLabel);
    });
    warmTarget.appendChild(warmFieldset);
    // --- BUILD COLD NETWORK BLOCK ---
    const coldTarget = document.getElementById("cold-network-target");
    const coldFieldset = document.createElement("fieldset");
    coldFieldset.className = "compact-panel lower-matrix";
    
    const coldLegend = document.createElement("legend");
    coldLegend.textContent = "Cold Network";
    coldFieldset.appendChild(coldLegend);

    Object.keys(cold_rf_network).forEach(coldKey => {
        const itemConfig = cold_rf_network[coldKey];
        const formLabel = document.createElement("label");
        const span = document.createElement("span");
        span.textContent = itemConfig.label + ":";
        formLabel.appendChild(span);

        const select = document.createElement("select");
        select.name = coldKey;
        itemConfig.states.forEach(state => {
            const opt = document.createElement("option");
            opt.value = state;
            opt.textContent = state;
            if (state === itemConfig.state) opt.selected = true;
            select.appendChild(opt);
        });
        select.addEventListener("change", (e) => {
            cold_rf_network[coldKey].state = e.target.value;
            pending_hardware_updates[coldKey] = e.target.value;
            console.log("Pending Queue Update:", JSON.stringify(pending_hardware_updates));
        });
        formLabel.appendChild(select);
        coldFieldset.appendChild(formLabel);
    });
    coldTarget.appendChild(coldFieldset);
});