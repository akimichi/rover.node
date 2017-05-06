
const image_process(canny)  => {
  canny.gaussianBlur([11,11]);
  canny.convertHSVscale() 
  const lower_hsv_threshold = [29, 86, 6];
  const upper_hsv_threshold = [64, 255, 255];
  // const lower_hsv_threshold = [0.11*256, 0.60*256, 0.20*256];
  // const upper_hsv_threshold = [0.14*256, 1.00*256, 1.00*256];
  // const lower_hsv_threshold = [40, 70, 70];
  // const upper_hsv_threshold = [80, 200, 200];
  canny.inRange(lower_hsv_threshold, upper_hsv_threshold)
  canny.erode(2);
  canny.dilate(2);
  var contours = canny.findContours();
  var GREEN = [0, 255, 0]; // B, G, R
  var WHITE = [255, 255, 255]; // B, G, R
  var RED   = [0, 0, 255]; // B, G, R
  const nIters = 2;
  const maxArea = 2500;
  const lineType = 8;
  const maxLevel = 0;
  const thickness = 1;
  for(var i = 0; i < contours.size(); i++) {
    if(contours.area(i) > maxArea) {
      var moments = contours.moments(i);
      var cgx = Math.round(moments.m10 / moments.m00);
      var cgy = Math.round(moments.m01 / moments.m00);
      canny.drawContour(contours, i, GREEN, thickness, lineType, maxLevel, [0, 0]);
      canny.line([cgx - 5, cgy], [cgx + 5, cgy], RED);
      canny.line([cgx, cgy - 5], [cgx, cgy + 5], RED);
    }
  }
  canny.drawAllContours(contours, WHITE);
  return canny;
};


          // image.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
          //   for (var i=0;i<faces.length; i++){
          //     var x = faces[i]
          //     image.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
          //   }
          //   image.save('./public/data/shot.jpg');
          //   fs.readFile('./public/data/shot.jpg', (err, buf) => {
          //     io.emit('shot', { image: true, buffer: buf.toString('base64')});
          //   });
          // });
module.exports = image_process; 
