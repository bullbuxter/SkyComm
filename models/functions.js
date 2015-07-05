module.exports = {
  wrapCode : function(id) {
      var front1 = (parseInt(Math.random() * 50) * (new Date().getMilliseconds())).toString();
      var front2 = '';
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 10-front1.length; i++ )
          front2 += charset.charAt(Math.floor(Math.random() * charset.length));
      return (front1 + front2);
  }
};