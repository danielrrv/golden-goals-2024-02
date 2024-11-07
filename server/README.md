# golden-goals-2024-02

## Summary:
- Install Jenkins and run it locally.
- Configure a node js project using pnpm, husky, eslint, winston/Morgan and vite/vitest(optional)
- Develop a simple application where 
  - Promises/Async is extensively used.
  - Implement OOP pattern.
  - Apply some design pattern.

## 3000 years ago

Once upon a time, in a magical land called Techlandia, there existed a wonderful world where Jenkins, a brave and determined soldier, took on the mission of delivering applications to the people. Alongside Jenkins, there was Nodejs, a heroic and agile hero who possessed the power to execute code on the server-side. Together, they formed an unstoppable duo.

In this enchanting world, applications were like precious treasures, and their safe delivery was of utmost importance. However, there were dark and sinister enemies that sought to disrupt the harmony of Techlandia.

The first enemy that Jenkins and Node encountered was a formidable creature known as the "Dependency Dragon." This dragon had the power to engulf applications in a web of tangled dependencies, causing chaos and confusion in their delivery. However, Node had a secret weapon - pnpm, a powerful dependency manager that allowed it to resolve and install dependencies with lightning speed. With pnpm's help, Node swiftly untangled the dependencies, freeing the applications from the Dependency Dragon's clutches.

But the enemies didn't stop there. Another adversary, the "Deployment Demon," lurked in the shadows, waiting to strike. This demon had the ability to create havoc during the deployment process, causing applications to crash and burn. However, Jenkins was not one to back down from a challenge. With its unrivaled strength and intelligence, Jenkins devised a flawless deployment pipeline, ensuring that every application was thoroughly tested and deployed seamlessly. Together with Node's efficient execution, they defeated the Deployment Demon, leaving no room for errors or crashes.

As Jenkins and Node continued their journey, they encountered the final and most menacing enemy of all - the "Performance Vampire." This vampire would drain the life force out of applications, causing them to slow down and struggle. But Jenkins and Node were not deterred. They joined forces and optimized the applications, fine-tuning every aspect to ensure optimal performance. With their unwavering dedication, they banished the Performance Vampire and restored Techlandia to its former glory.

In this wonderful world, Jenkins and Node were hailed as heroes, their names forever etched in the annals of Techlandia's history. Their unwavering courage, clever strategies, and powerful tools like pnpm, enabled them to defeat the enemies that threatened the safe delivery of applications.

And so, the tale of Jenkins the soldier and Node the hero became legendary, inspiring generations to come to embrace innovation, collaboration, and the power of technology to create a better world.


In modern days, the world of technology evolved, and new challenges emerged in Techlandia. Developers faced increasingly complex systems, security threats, and the need for faster and more efficient delivery of applications. They needed the guidance and wisdom of the legendary soldier, Jenkins, and the heroic Node to overcome these modern-day challenges.

That's why this adventures will takes through the awakening of the legends: Jenkins and Node with its best skills and dexterity. Continue...

### Chapter #1: The Birth of Jenkins

Dear Jose,

If you're looking to harness the power of Jenkins and awaken the legendary soldier within your machine, look no further than Docker. Docker is a powerful tool that allows you to easily install and manage applications in isolated containers. Here's a short instruction to guide you through the process of installing Jenkins using Docker:

1. Begin by ensuring that Docker is installed on your machine. If you haven't installed Docker yet, visit the official Docker website and follow the instructions for your operating system.

2. Open a terminal or command prompt on your machine.

3. Pull the Jenkins image from the Docker Hub repository by running the following command:

   ```
   docker pull jenkins/jenkins
   ```

   This command will download the latest Jenkins image to your machine, ready to be run as a container.

4. Once the image is downloaded, you can start the Jenkins container using the following command:

   ```
   docker run -p 8080:8080 -p 50000:50000 jenkins/jenkins
   ```

   This command will start the Jenkins container, mapping port 8080 on your machine to port 8080 within the container, and port 50000 for Jenkins agent communication.

5. Wait for a few moments until Jenkins starts up. You can monitor the progress in the terminal, and once you see a message indicating that Jenkins is ready, you can proceed.

6. Open your web browser and visit `http://localhost:8080`. This will take you to the Jenkins setup wizard.

7. In the terminal, you will see a message with an automatically generated initial admin password. Copy the password and paste it into the setup wizard to unlock Jenkins.

8. Follow the instructions in the setup wizard to customize your Jenkins installation. You can choose to install suggested plugins or select specific plugins based on your needs.

9. Once the installation is complete, create an admin user and provide the necessary details.

10. Finally, you can start using Jenkins by clicking on the "Start using Jenkins" button.

Congratulations! You have successfully installed Jenkins using Docker. You can now explore the vast capabilities of Jenkins, unleash your developer skills, and bring forth the legendary soldier within you.

Remember to keep Docker and Jenkins updated regularly to benefit from the latest features and security patches. With Jenkins at your side, you're poised to conquer the challenges of the modern tech landscape.

Happy coding and may your journey be filled with triumphs!

Best regards,


### Chapter #2: The Jenkins's awakening

Now that you have Jenkins installed using Docker, it's time to run a simple "Hello World" application and create your first Jenkins file. Here's a step-by-step guide to help you get started:

1. Create a new directory on your machine for your project. You can name it something like "hello-world".

2. Inside the "hello-world" directory, create a new file called "index.js". Open the file and add the following code:

   ```javascript
   console.log("Hello, World!");
   ```

   This simple JavaScript code will print "Hello, World!" to the console.

3. Save the "index.js" file.

4. Now, it's time to create your first Jenkins file. Inside the "hello-world" directory, create a new file called "Jenkinsfile" (note the capital "J").

5. Open the "Jenkinsfile" and add the following code:

   ```groovy
   pipeline {
       agent any

       stages {
           stage('Build') {
               steps {
                   echo 'Building the application...'
                   sh 'node index.js'
               }
           }
       }
   }
   ```

   This Jenkinsfile defines a simple pipeline with one stage called "Build". In this stage, it echoes a message to the Jenkins console and runs the "node index.js" command to execute your "Hello World" application.

6. Save the "Jenkinsfile".

7. Open your web browser and visit `http://localhost:8080` (or the appropriate URL if you've customized the Jenkins port). This will take you to the Jenkins dashboard.

8. Click on "New Item" to create a new Jenkins job.

9. Provide a name for your job, such as "Hello World".

10. Select "Pipeline" as the job type and click "OK".

11. In the configuration page, scroll down to the "Pipeline" section.

12. In the "Definition" dropdown, select "Pipeline script from SCM".

13. In the "SCM" section, select "None" as you'll be using a Jenkinsfile directly.

14. Click "Save" to create the job.

15. On the Jenkins dashboard, click on your newly created job ("Hello World").

16. Click on "Build Now" to trigger the build process.

17. Watch the console output as Jenkins builds and executes your "Hello World" application.

Congratulations! You have successfully run a simple "Hello World" application using Jenkins and created your first Jenkinsfile. This is just the beginning of your journey with Jenkins, and you can now explore more advanced capabilities and stages to build and deploy your applications.

Keep exploring, learning, and pushing the boundaries of your development skills with Jenkins by your side.


### Chapter #3: Calling up Nodejs and its sword pnpm

NodeJs has been waiting its moment to be called. Now it's the moment to configure the project. Essentially the application is 

1. pnpm:
   - Documentation: [https://pnpm.js.org/](https://pnpm.js.org/)

2. ESLint:
   - Official Guide: [https://eslint.org/docs/user-guide/getting-started](https://eslint.org/docs/user-guide/getting-started)

3. Husky:
   - Official GitHub Repository: [https://github.com/typicode/husky](https://github.com/typicode/husky)

4. Node.js Best Practices:
   - Official Node.js Documentation: [https://nodejs.dev/learn](https://nodejs.dev/learn)
   - Node.js Best Practices by Gergely Nemeth: [https://github.com/goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices)
  
5. Vite/Vitest(Optional)

These sources provide detailed documentation, guides, and examples on how to configure and use pnpm, ESLint, Husky, and follow the best practices for developing Node.js applications.

By referring to these sources, you'll have access to comprehensive information and guidance to help you configure your Node.js application with the desired tools and practices.

Happy coding and may your application thrive!



### Chapter #3: The night before the assault:

Just select one of these ideas and start developing a strategic application's knock out.

1. Online Food Ordering App: Create an app that allows users to browse and order food from local restaurants. You can focus specifically on a pizza or sushi restaurant, providing menus, customization options, delivery tracking, and secure online payments.

2. Formula 1 Fan App: Develop an application for Formula 1 enthusiasts that provides race schedules, live race updates, team information, driver profiles, and news. You can also include a feature to sell official team merchandise like t-shirts, hats, and other accessories.

3. Fitness Tracker App: Build a fitness tracking app that allows users to set goals, track their workouts, monitor their progress, and provide personalized recommendations. Include features such as calorie tracking, workout plans, and integration with wearables for a comprehensive fitness experience.

4. Language Learning App: Create a language learning app that offers lessons, quizzes, and interactive exercises to help users learn a new language. You can include features like vocabulary builders, pronunciation guides, and progress tracking to make language learning engaging and effective.

5. Event Planning App: Develop an app that simplifies event planning for users. They can create and manage events, send invitations, track RSVPs, and provide event details. Include features like reminders, guest lists, and integration with popular calendar apps to streamline the event planning process.

6. Virtual Tour App: Build an app that offers virtual tours of famous landmarks, cities, or natural wonders. Users can explore different locations through interactive 360-degree images, read about historical facts, and access audio guides for a unique and immersive travel experience.

7. Recipe Sharing App: Create a platform for food enthusiasts to share and discover recipes. Users can upload their favorite recipes, add photos, rate and review recipes, and create personal collections. Include features like ingredient search, dietary restrictions filters, and social sharing options.


