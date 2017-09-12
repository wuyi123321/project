
<script type="text/javascript">
  const colorList = [ '#F9F900', '#6FB7B7'];
  const colorListLength = 20 ;
  function getRandColor ()
  {
    var tem = Math.round(Math.random() * colorListLength);
    return colorList[tem]
  }
  export default {
    colorList,
    colorListLength,
    getRandColor
  }
  </script>
