# [quantum-analyzer.art](https://quantum-analyzer.art)

*To build a self-replicating technology stack which delivers the Quantum SI directly to the quantum wafer*

## data/ folder:

Data consists of a sequence of .json files which includes instrument state, raw data from measured calibration standards, ideal data for calibration standards, scattering parameters in real units, and noise temperature in kelvin referenced to the quantum noise source.   

 - ideal_standards.json
 - measured_standards.json
 - s\_parameters\_[timestamp].json
 - noise\_temperature\_[timestamp].json
 - instrument\_state\_[timestamp].json

## plots/ folder:
  
 - s\_parameters\_[timestamp].png
 - noise_temperature\_[timestamp].png

## Hardware Stack

 - dilution refrigerator
 - vector network analyzer
 - spectrum analyzer
 - room temperature switches
 - cryogenic switches
 - room temperature 4-8 GHz low noise amplifiers
 - cryogenic 4-8 GHz low noise amplifiers
 - cryogenic 4-8 GHz double isolators
 - cryogenic directional couplers
 - cryogenic diplexers
 - cryogenic bias tees
 - Control electronics for cold switches
 - USB to GPIB converters
 - personal computer
 - USB hubs
 - USB to ethernet converter
 - ethernet hub
 - 19 inch instrument rack
 - precision machined gold plated OFHC copper mounting brackets to base of dilution refrigerator
 - cryogenic attenuators
 - Josephson parametric amplifiers(with packaging)
 - Shot Noise Tunnel Junction noise source(with packaging)
 - Travelling Wave Parametric Amplifier(with packaging)
 - vacuum gap dielectric offset short(and/or mTRL) standards
 - wafer probe cards for full wafer testing
 - Waveguide qubit power sensor

## Software stack

 - [windows](https://en.wikipedia.org/wiki/Microsoft_Windows)
 - [apache](https://en.wikipedia.org/wiki/Apache_HTTP_Server)
 - [php](https://en.wikipedia.org/wiki/PHP)
 - [python](https://en.wikipedia.org/wiki/Python_(programming_language))
 - [miniforge](https://github.com/conda-forge/miniforge)
 - [dirt](github.com/lafelabs/dirt/)
 - [geometron](github.com/lafelabs/geometron-spore/)
 - [matplotlib](https://matplotlib.org/)
 - [numpy](https://numpy.org/)
 - [scikit-rf](https://scikit-rf.org/)
 - [MUF](https://www.nist.gov/services-resources/software/wafer-calibration-software)
 - [showdown.js](https://github.com/showdownjs/showdown)
 - [p5.js](https://p5js.org/)
 - [p5.sound.js](https://p5js.org/reference/p5.sound/)
 - [ace.js](https://ace.c9.io/)
 - [mathjax.js](https://www.mathjax.org/)
 - [qrcode.js](https://davidshimjs.github.io/qrcodejs/)
 - [web sockets](https://websockets.readthedocs.io/en/stable/)
 - [jupyterlab](https://jupyter.org/)

## Work flow

1. replicate the system
2. measure test structures, compare to models, build better structures
3. measure test structures on each run to get calibration
4. measure gain and noise roughly by hand with control through a unified web browser interface, with calibration
5. use software to automate taking larger data sets which are all time sequences of calibrated traces with instrument state data and time stamps
6. data are fed into LLM to feed back to simulation and design algorithms, and are used to design next-generation test protocols as well as the wafer
7. the feedback loop is accelerated, with fully algorithmic evolved quantum amplifier devleopment, with fully automated testing and design and simulation. AI-accelerated quantum will be what drives quantum-accelerated AI.

## Instrument State

- vna
- spectrum_analyzer
- jpa\_flux\_bias
- twpa\_currrent\_bias
- jpa_pump
- twpa_pump
- room\_temperature\_switches
- cryogenic\_switches
- programmable\_attenuator
- dilution\_refrigerator
- quantum\_noise\_bias
- waveguide\_qubit\_flux\_bias

## References


