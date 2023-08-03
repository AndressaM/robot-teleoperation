# Framework para teleoperação de robôs móveis
Este repositório abriga a implementação de um framework para teleoperação de robôs móveis que utilizam o ROS (Robot Operating System). O ROS é um sistema operacional flexível e modular amplamente utilizado para desenvolvimento e controle de robôs. Com o framework presente neste repositório, é possível controlar remotamente robôs móveis compatíveis com o ROS, permitindo uma interação intuitiva e eficiente com o ambiente ao redor. O framework fornece funcionalidades para a teleoperação, como controle direto e controle supervisório.

## Sobre o código
Os algoritmos foram desenvolvidos para rodar no ecossistema ROS, especificamente na distribuição Noetic rodando no Ubuntu 20.04.5 LTS. As mensagens de comunicação estão aplicadas ao robô Turtlebot 3 modelo waffle-pi.

## Dependências
[ROS Noetic](https://www.ros.org/) (Noetic na branch)

[Python 3.6](https://www.python.org/)

[Ros turtlebot3](git@github.com:ROBOTIS-GIT/turtlebot3.git)

[Robot web Tools](https://github.com/RobotWebTools)
## Aplicação
`cd react-ros-robot`

Para rodar a aplicação

`npm start`

Abra http://localhost:3000 para vizualização em seu browser

## ROS
Para utilizar os modos de operação é necessário que o robô está no modo bringup , isto é todos os nós do ros ativos.

### Setup no PC

Iniciar ros master 

`$ roscore`

Iniciando comunicação com websocket e servidor do video

`roslaunch rosbridge_server rosbridge_websocket.launch`

`rosrun web_video_server web_video_server`

### Setup no robô (Turtlebot 3)

[Turtlebot3 Manual](https://emanual.robotis.com/docs/en/platform/turtlebot3/quick-start/)

Para utilização do do controle supervisório é necessário iniciar alguns tópicos do ROS:


## Share control
Exportando modelo do robô :

`export TURTLEBOT3_MODEL=${TB3_MODEL}`

Iniciando nó de navegação 

`roslaunch turtlebot3_navigation turtlebot3_navigation.launch map_file:=$HOME/map.yaml`

Iniciando nó para posição do robô

`rosrun riotu_robot_pose_publisher riotu_robot_pose_publisher`

## Referências

Este código foi criado e adaptado basedo no curso : 
https://github.com/aniskoubaa/udemy-rosbridge-course/tree/main
