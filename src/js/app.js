let no_of_floors = 5;
let no_of_lifts = 3;
let lifts = []

function create_floors() {
    for(let i=no_of_floors-1;i>=0; i--) {
        let floor = document.createElement("div");
        floor.className = 'floor';
        floor.id = `floor-${i}`;
      
      let floor_controls = document.createElement('div');
      floor_controls.className = 'floor-controls'
        floor_heading = document.createElement('h3');
        floor_heading.className = 'lift-floor-number';
        floor_heading.innerHTML= i==0? "Ground Floor" : `Floor ${i}`;
        floor_controls.append(floor_heading)
      
      let up_btn = document.createElement('button');
      up_btn.classList.add('btn','up-btn');
      up_btn.innerHTML = 'Up';
      floor_controls.append(up_btn);
      
      let down_btn = document.createElement('button');
      down_btn.classList.add('btn','down-btn');
      down_btn.innerHTML = 'Down';
      floor_controls.append(down_btn);
      
      
      let floor_container = document.getElementById("floor-container");
       
 			let lift_container = document.createElement('div');
  		lift_container.className='lift-container';
  		lift_container.id=`lift-container-${i}`;
       
      floor.append(floor_controls);
      floor.append(lift_container);
      floor_container.append(floor);
    }
}

function create_lifts() {
         let lift_container = document.getElementById('lift-container-0');
  for(let i=0;i<no_of_lifts;i++) {
        
        let lift_struct = document.createElement('div');
        lift_struct.className = "lift";
        lift_struct.id = "lift-" + (i+1);

        left_door = document.createElement('div');
        left_door.classList.add("lift-door","l-left");
        lift_struct.append(left_door);
        right_door = document.createElement('div');
        right_door.classList.add("lift-door","l-right");
        lift_struct.append(right_door);
      
        lift_struct.style.left = `${10 + 20* lift_struct.id }px`;
        
        let lift = {
          'id':i,
          'current_floor':0,
          'is_moving':false
        };
      lift_container.append(lift_struct);
        lifts.push(lift);
    }
}

class LiftController {
  liftChooser() {
    for(let lift in lifts)
    if(!lift.is_moving)
      return lift.id;
  }
  moveUp() {
    document.get
  }
}


function main() {
  create_floors();
  create_lifts();
}

main();