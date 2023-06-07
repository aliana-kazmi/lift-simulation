let no_of_floors = 5;
let no_of_lifts = 1;
let lifts = []
let FLOOR_HEIGHT = 125; //in px

class SimulateBuilding
{
create_floors() {
  for(let i=no_of_floors-1;i>=0; i--) {
    let floor = document.createElement("div");
    floor.className = 'floor';
    floor.id = `floor-${i}`;
      
    let floor_controls = document.createElement('div');
    floor_controls.className = 'floor-controls'
    let floor_heading = document.createElement('h3');
    floor_heading.className = 'lift-floor-number';
    floor_heading.innerHTML= i==0? "Ground Floor" : `Floor ${i}`;
    floor_controls.append(floor_heading)
      
    let up_btn = document.createElement('button');
    up_btn.classList.add('floor-btn','up-btn');
    up_btn.id = `up-btn-${i}`;
    up_btn.innerHTML = 'Up';
    floor_controls.append(up_btn);
      
    let down_btn = document.createElement('button');
    down_btn.classList.add('floor-btn','down-btn');
    down_btn.id = `down-btn-${i}`;
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

create_lifts() {
  let lift_container = document.getElementById('lift-container-0');
  for(let i=0;i<no_of_lifts;i++) {
        
    let lift_struct = document.createElement('div');
    lift_struct.className = "lift";
    lift_struct.id = `lift-${i}`;

    let left_door = document.createElement('div');
    left_door.classList.add("lift-door","l-left");
    left_door.id = `left-door-${i}`;
    lift_struct.append(left_door);
    let right_door = document.createElement('div');
    right_door.classList.add("lift-door","l-right");
    right_door.id = `right-door-${i}`;	
    lift_struct.append(right_door);
      
    lift_struct.style.left = `${10 + 35 + 20* lift_struct.id }px`;
        
    let lift = {
      'current_floor':0,
      'is_moving':false
    };
    
    lift_container.append(lift_struct);
    lifts.push(lift);
  }
}
}
class LiftController{
 lift_chooser(destination_floor) {
  let shortest_distance = Infinity;
  let closest_lift_id;
    for(let i = 0; i < lifts.length; i++) {
    let current_distance = Math.abs(lifts[i].current_floor - destination_floor);
    if((!lifts[i].is_moving) && (current_distance < shortest_distance))
      {
      shortest_distance = current_distance
      closest_lift_id = i;
      }
    }
    return closest_lift_id;
  }

lift_movement(destination_floor) {
  let closest_lift_id = this.lift_chooser(destination_floor);
	var closest_lift_struct = document.getElementById(`lift-${closest_lift_id}`);
  let current_floor = lifts[closest_lift_id].current_floor;
  
  let distance = -1 * FLOOR_HEIGHT * (destination_floor);
  let time_traversed = 2 * Math.abs(destination_floor - current_floor);
  
  lifts[closest_lift_id].is_moving = true;
  lifts[closest_lift_id].current_floor = destination_floor;
  let traversing = setTimeout(() => {
  let left_door = document.getElementById(`left-door-${closest_lift_id}`)
  left_door.removeEventListener("transitionend", close_door);
  lifts[closest_lift_id].is_moving = false;
  }, (time_traversed + 2.5) * 1000);

  closest_lift_struct.style.transform = `translateY(${distance}px)`;
  closest_lift_struct.style.transitionDuration = `${time_traversed}s`;
  closest_lift_struct.addEventListener('transitionend',door_animation)
  return;
}
}
function door_animation(e) {
  let closest_lift_id = e.target.id.charAt(e.target.id.length-1)
	var closest_lift_struct = document.getElementById(`lift-${closest_lift_id}`);
  closest_lift_struct.removeEventListener("transitionend", door_animation);
  let left_door = document.getElementById(`left-door-${closest_lift_id}`)
  let right_door = document.getElementById(`right-door-${closest_lift_id}`)
  
  left_door.style.transform = `translateX(0%)`;
  right_door.style.transform = `translateX(0%)`;

  left_door.removeEventListener("transitionend", door_animation);
  right_door.removeEventListener("transitionend", door_animation);
  left_door.addEventListener("transitionend", open_door)
  console.log('door animation executed')
  return;
}
function open_door(e) {

  let closest_lift_id = e.target.id.charAt(e.target.id.length-1)
  console.log(closest_lift_id)
  let left_door = document.getElementById(`left-door-${closest_lift_id}`)
  let right_door = document.getElementById(`right-door-${closest_lift_id}`)
  left_door.style.transform = `translateX(-100%)`;
  right_door.style.transform = `translateX(100%)`;
  left_door.style.animation = `all 1.25s ease-forwards 1.25s`;
  right_door.style.animation = `all 1.25s ease-forwards 1.25s`;
  left_door.removeEventListener('transitionend',open_door)
  left_door.addEventListener('transitionend',close_door)
  console.log('open door executed')
}

function close_door(e) {

  let closest_lift_id = e.target.id.charAt(e.target.id.length-1)
  let left_door = document.getElementById(`left-door-${closest_lift_id}`)
  let right_door = document.getElementById(`right-door-${closest_lift_id}`)
  left_door.style.transform = `translateX(0%)`;
  right_door.style.transform = `translateX(0%)`;
  left_door.style.transition = `all 1.25s ease-out 1.25s`;
  right_door.style.transition = `all 1.25s ease-out 1.25s`;
  
  left_door.removeEventListener('transitionend',open_door)
  console.log('close door executed')
}

main = async () => {
  var building_creator = new SimulateBuilding();
  building_creator.create_floors();
  building_creator.create_lifts();
  var lift_controller = new LiftController();
  floor_btns = document.querySelectorAll('.floor-btn');
  for(var i=0;i<floor_btns.length;i++)
  {
    floor_btns[i].addEventListener('click',(i) => {
    var temp = i.target.getAttribute('id')
    var destination_floor_id = temp.charAt(temp.length-1)
    lift_controller.lift_movement(destination_floor_id)
    });
  }
}

main();  
