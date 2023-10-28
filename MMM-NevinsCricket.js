Module.register('MMM-NevinsCricket', {
  defaults: {
    //nah we don't do that here...
  },

  start: function () {
    this.cricketData = {};
    this.loaded = false;
    this.hidden = false;
    this.sendSocketNotification('CONFIG', this.config);
  },

  getStyles: function () {
    return ['MMM-NevinsCricket.css'];
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    wrapper.className = 'nevinscricket';
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = this.cricketData.title.split(',')[0].trim();
    wrapper.appendChild(titleDiv);

    const currentDiv = document.createElement('div');
    if (this.cricketData.current !== 'Data Not Found') {
      currentDiv.innerHTML = this.cricketData.current;
      currentDiv.style.fontSize = '22px';
      wrapper.appendChild(currentDiv);

      const bowlerTeamScoreDiv = document.createElement('div');
      if (this.cricketData.bowl_team_score !== 'Data Not Found') {
        bowlerTeamScoreDiv.innerHTML = this.cricketData.current;
        bowlerTeamScoreDiv.style.fontSize = '20px';
        wrapper.appendChild(bowlerTeamScoreDiv);
      }
      const runrateDiv = document.createElement('div');
      runrateDiv.innerHTML = this.cricketData.runrate;
      runrateDiv.style.fontSize = '18px';
      wrapper.appendChild(runrateDiv);

      const batsmanDiv = document.createElement('div');
      batsmanDiv.innerHTML = 'On strike: ' + this.cricketData.batsman;
      batsmanDiv.style.fontSize = '18px';
      wrapper.appendChild(batsmanDiv);

      const bowlerDiv = document.createElement('div');
      bowlerDiv.innerHTML = 'Bowler: ' + this.cricketData.bowler;
      bowlerDiv.style.fontSize = '18px';
      wrapper.appendChild(bowlerDiv);

    } else {
      const fResultDiv = document.createElement('div');
      fResultDiv.innerHTML = this.cricketData.final_result;
      fResultDiv.style.fontSize = '18px';
      wrapper.appendChild(fResultDiv);
    }

    return wrapper;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'CRICKET_DATA') {
      this.cricketData = payload;
    }
  },

  notificationReceived: function (notification, payload, sender) {
    if (notification === 'DOM_OBJECTS_CREATED') {
      this.hide(0, { lockString: this.identifier });
    }
  },
});
