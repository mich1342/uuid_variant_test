#!/bin/bash

num_of_device=1000
safety_factor=2
years_of_usage=10
alert_per_day=24
let target="num_of_device*years_of_usage*365*alert_per_day*safety_factor"
row_per_execution=10000
let total_iter="target/row_per_execution"
num_of_core=12
let iter_num="total_iter/num_of_core"

echo $num_of_core $iter_num

for (( x=1 ; x<=$iter_num ; x++ ));
do
  for(( y=1 ; y<=$num_of_core ; y++ ));
  do
    gnome-terminal -- bash -c "echo `date` $x;node process.js"
  done
  sleep 60
done
