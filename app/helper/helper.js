var helpers = {

  // Source: http://stackoverflow.com/a/1714899/192024
  buildQuerystring: function(obj) {
    var str = []
    for(var p in obj)
      if (obj.hasOwnProperty(p))
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    return str.join('&')
  },

  // Source: http://phpjs.org/functions/preg_quote/
  preg_quote: function(str, delimiter) {
    return String(str)
      .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
  },

  // Determine if a given string matches a given pattern.
  str_is: function(pattern, value) {
    if(pattern == value) return true
    if(pattern == '*') return true

    pattern = this.preg_quote(pattern, '/')

    // Asterisks are translated into zero-or-more regular expression wildcards
    // to make it convenient to check if the strings starts with the given
    // pattern such as "library/*", making any string check convenient.
    var regex = new RegExp('^' + pattern.replace('\\*', '.*') + '$')

    return !!value.match(regex);
  },
  shorten: function(str,len) {
    if (typeof str===null){
      return;
    }

    if (str.length>len) {
        return str.substring(0,len)+"…";
    }
    else {
        return str;
    }

  },
  camelCase: function (input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
  },
  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  permalink: function(string) {

    if (typeof string == "undefined") {
        return;
    }
    return encodeURIComponent(string.replace(/-/g,"_").replace(/\s/g,"-"));
  },
  unPermalink: function(string) {
    if (typeof string == "undefined") {
        return;
    }
    return decodeURIComponent(string.replace(/-/g," ").replace(/_/g,"-"));
  },
  timeAgo: function(date_str) {
    date_str = date_str.replace('+0000','Z');
    var time_formats = [
        [60, 'just now', 1],
        [120, '1 minute ago', '1 minute from now'],
        [3600, 'minutes ago', 60],
        [7200, '1 hour ago', '1 hour from now'],
        [86400, 'hours ago', 3600],
        [172800, 'yesterday', 'tomorrow'],
        [604800, 'days ago', 86400],
        [1209600, 'last week', 'next week'],
        [2419200, 'weeks ago', 604800],
        [4838400, 'last month', 'next month'],
        [29030400, 'months ago', 2419200],
        [58060800, 'last year', 'next year'],
        [2903040000, 'years ago', 29030400],
        [5806080000, 'last century', 'next century'],
        [58060800000, 'centuries ago', 2903040000]
    ];
    var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    if(time.substr(time.length-4,1)==".") time =time.substr(0,time.length-4);
    var seconds = (new Date - new Date(time)) / 1000;
    var token = '', list_choice = 1;
    if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'ago';
    list_choice = 2;
    }
    var i = 0, format;
    while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
    return time;
  }
}

module.exports = helpers
