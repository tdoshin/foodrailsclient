# FoodRails Application

A full CRUD application where a user can create and store food recipe cards. Backend is hosted on AWS Elastic Beanstalk 

## Technologies Used
- JavaScript 
- HTML
- CSS
- React CSS Bootstrap (New)
- Postgresql
- Rails (For Backend Build)
- Ruby
- AWS Elastic Beanstalk(For backend deployment) (New)
- Netlify (For Frontend deployment)


## WireFraming

![image](https://user-images.githubusercontent.com/72947001/124055847-45b50d00-d9ea-11eb-8177-6f43d6cb0910.png)


## The App 

![image](https://user-images.githubusercontent.com/72947001/124055938-71d08e00-d9ea-11eb-8975-746781ec6cea.png)

## AWS Elastic Beanstalk 
Hosted backend on AWS Elastic Beanstalk. With Elastic Beanstalk, I could quickly deploy and manage applications in the AWS Cloud without having to learn about the infrastructure that runs those applications. Elastic Beanstalk reduces management complexity without restricting choice or control. Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring. 3 main parts to hosting

Container - My App 
Version - Deployable build of my application 
Configuration template - Contains config information for both Beanstalk environment and my App

## Challenges encountered, lessons learned, and future improvements

- Struggled with URL linking issue which caused issues with my update and delete routes
- Struggled with backend AWS hosting. Site is currently insecure (HTTP instead of HTTPS)
- I would like to add more functionality to this application. Some are:     
    - Connect with a nutrition API and render "nutrition scores" to users based on their recipe input
    - Ability to show "Card of the Week" based on combination of likes and nutrition score a particular users' card has 


## Link to Frontend application 

- To view live hosted application, click  [here](https://foodrails.netlify.app/)

## Instructions 

- Pretty simple, go to [the app](https://foodrails.netlify.app/), click "Get Started" and create and publlish your recipe!

