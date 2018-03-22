import React from 'react'


const CourseTeaching = ({click, courses}) => {
  console.log('course teaching', courses);
  let courseList = courses ? <div> {Object.keys(courses).map(key =>

    <p key={key} onClick={()=> click(key)}>
      key = {key}
      title={courses[key].metadata.title}
    </p>
  )} </div> : <p> Looks like you haven't registered any course yet. Register your courses</p>
  return (
      <div>
        {courseList}
      </div>
  );
}

export default CourseTeaching
