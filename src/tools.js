/**
 * Returns the time passed since <milliseconds> in a more readable way.
 * @param {Number} ms
 */
function uploadedFormat(ms) {
    const time = Date.now() - ms;
    const sec = Math.floor(time / 1000);
    const hours = Math.floor(sec / 3600);
    
    if (hours === 1) {
        return 'Fyrir 1 klukkustund síðan';
    }
    
    if (hours <= 24) {
        return `Fyrir ${hours} klukkustundum síðan`;
    }
    
    const day = Math.floor(hours / 24);

    if (day === 1) {
        return 'Fyrir 1 degi síðan';
    }
    
    if (day <= 7) {
        return `Fyrir ${day} dögum síðan`;
    } 
    
    const week = Math.floor(day / 7);
    
    if (week === 1) {
        return 'Fyrir 1 viku síðan';
    }
    
    if (week <= 4) {
        return `Fyrir ${week} vikum síðan`;
    }
    
    const month = Math.floor(day / 30);
    
    if (month === 1) {
        return 'Fyrir 1 mánuði síðan';
    }
    
    if (month <= 11) {
        return `Fyrir ${month} mánuðum síðan`;
    }
    
    const year = Math.floor(month / 12);
    
    if (year === 1) {
        return 'Fyrir 1 ári síðan';
    }
    
    return `Fyrir ${year} árum síðan`;

  }
  
  /**
   * Creates a string using the format mm:ss from <seconds>
   * @param {Number} s
   */
  function minSecFormat(s) {
    const min = Math.floor(s / 60);
    const sec = s % 60;
  
    return `${min}:${sec < 10 ? 0 : ''}${sec}`;

  }
  
  module.exports = { minSecFormat, uploadedFormat };