import React, {Component} from 'react'
import CourseMeta from '../coursePage/CourseMeta'
import CourseFeatures from '../coursePage/CourseFeatures'
import CourseGallery from '../coursePage/CourseGallery'

const InfoBundle = ({meta, features, images}) => {
  return (
      <div>
         <CourseMeta meta={meta}/>
         <CourseFeatures features={features}/>
         <CourseGallery images={images}/> 
      </div>
  );
}

export default InfoBundle
