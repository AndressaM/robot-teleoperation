#roscore &
#sleep 2

#export TURTLEBOT3_MODEL=waffle &
roslaunch turtlebot3_gazebo turtlebot3_house.launch &
sleep 10 &
roslaunch rosbridge_server rosbridge_websocket.launch &
# roslaunch turtlebot3_slam turtlebot3_slam.launch slam_methods:=gmapping &
wait
