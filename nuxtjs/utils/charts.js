const RESOLUTON = {
    M1: '1m',
    M3: '3m',
    M5: '5m',
    M15: '15m',
    M30: '30m',
    H1: '1H',
    H2: '2H',
    H4: '4H',
    H6: '6H',
    H12: '12H',
    D: '1D',
    W: '1W',
    M: '1M',
}

export const getResolution = _resolution => {
    if(!_resolution) return RESOLUTON.M1;
    let newResolution = '';
    switch (_resolution + '') {
        case "1":
            newResolution = RESOLUTON.M1;
            break;
        case "3":
            newResolution = RESOLUTON.M3;
            break;
        case "5":
            newResolution = RESOLUTON.M5;
            break;
        case "15":
            newResolution = RESOLUTON.M15;
            break;
        case "30":
            newResolution = RESOLUTON.M30;
            break;
        case "60":
            newResolution = RESOLUTON.H1;
            break;
        case "120":
            newResolution = RESOLUTON.H2;
            break;
        case "240":
            newResolution = RESOLUTON.H4;
            break;
        case "360":
            newResolution = RESOLUTON.H6;
            break;
        case "720":
            newResolution = RESOLUTON.H12;
            break;
        case "1D":
            newResolution = RESOLUTON.D;
            break;
        case "1W":
            newResolution = RESOLUTON.W;
            break;
        case "1M":
            newResolution = RESOLUTON.M;
            break;
    
        default:
            newResolution = 1 + _resolution;
            break;
    }

    return newResolution;
}

/**
 * 1m => 1; 1H => 60; 1W = 24 * 60; ....
 * @param {*} _resolution 
 */
export const revertResolution = (_resolution) => {
    let revertTime = 1;
    if(!_resolution) {
        return 1
    }else if(_resolution.includes('m')){
        revertTime = parseInt(_resolution.replace('m', ''));
    }else if(_resolution.includes('H')){
        revertTime = parseInt(_resolution.replace('H', '')) * 60;
    }else if(_resolution.includes('D')){
        revertTime = parseInt(_resolution.replace('D', '')) * 24 * 60;
    }else if(_resolution.includes('W')){
        revertTime = parseInt(_resolution.replace('W', '')) * 7 * 24 * 60;
    }else if(_resolution.includes('M')){
        revertTime = parseInt(_resolution.replace('M', '')) * 30 * 24 * 60;
    }

    return revertTime;

}

export const getHistoricalDataByResolution = (_resolution, _resolutionBack, _intervalBack) => {
    if(!_resolution) return undefined;
    let historicalObj = undefined;
    
    switch (_resolution) {
        case "1":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 0.125
            }
    break;
  case "3":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 0.25
            }
    break;
  case "5":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 0.5
            }
    break;
  case "15":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 1
            }
    break;
  case "30":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 4
            }
    break;
  case "60":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 8
            }
    break;
  case "120":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 16
            }
    break;
  case "240":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 24
            }
    break;
  case "360":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 32
    }
  case "720":
            historicalObj =  {
                resolutionBack: 'D',
                intervalBack: 64
            }
    break;
    
        case "1D":
            historicalObj =  {
                resolutionBack: 'M',
                intervalBack: 4
            }
            break;
        case "1W":
            historicalObj =  {
                resolutionBack: 'M',
                intervalBack: 24
            }
            break;
        case "1M":
            historicalObj =  {
                resolutionBack: 'M',
                intervalBack: 48
            }
            break;
    
        default:
            break;
    }

    return historicalObj;
}