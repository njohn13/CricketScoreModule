const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({
    start: function () {
        this.current = '';
    },

    fetchCricketData: function (payload) {
        const apiUrl = payload.url;

        request(apiUrl, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                if (data.success && data.livescore.current !== this.current) {
                    this.current = data.livescore.current;
                    this.sendSocketNotification('CRICKET_DATA', data.livescore);
                }
            } else {
                console.error('Error fetching cricket data:', error);
            }

            setTimeout(() => this.fetchCricketData(payload), 15000);
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'CONFIG') {
            this.fetchCricketData(payload);
        }
    },
});
