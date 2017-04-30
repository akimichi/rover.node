#!/bin/sh
 
# mjpg-streamer start script
 
# Path to mjpg_streamer and libraries
export LD_LIBRARY_PATH="/home/emile/local/bin/mjpg-streamer-experimental"
STREAMER="$LD_LIBRARY_PATH/mjpg_streamer"
 
# Pi camera configurations
XRES="640"
YRES="480"
FPS="10"
 
# Web configurations
WWWDOC="$LD_LIBRARY_PATH/www"
PORT="8080"
USER="user"
PASS="password"
 
# Start streaming
$STREAMER -i "input_raspicam.so -x $XRES -y $YRES -fps $FPS" \
          -o "output_http.so -w $WWWDOC -p $PORT"

