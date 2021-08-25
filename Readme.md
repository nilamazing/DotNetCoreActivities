This Project is used to create .Net Core API with React Front End.

Plugins/Extensions
--------------------
1. C# - Syntax highlighting, editing, intellisense and Debug
2. NuGet Gallery - To setup package from NuGet
3. SQLite - Explore and Query SQLite databases.

Steps
-----
1. Create sln file :- dotnet new sln
2. Create a webapi project :- dotnet new webapi -n API
3. Create Class Libraries "Applications, Persistence, Domain"
   dotnet new classlib -n Applications
   dotnet new classlib -n Persistence
   dotnet new classlib -n Domain
4. Add the WebApi and class libraries to the solution file
    dotnet sln Reactivaties.sln add API
    dotnet sln Reactivaties.sln add Applications
    dotnet sln Reactivaties.sln add Persistence
    dotnet sln Reactivaties.sln add Domain
5. Project Dependencies

     API --> Applications  <--> Persistence ---> Domain

6. Add the dependencies between the projects
   In API folder, please use command :-  dotnet reference add Applications
   In Applications folder, please use command :-  dotnet reference add Persistence
   In Persistence folder, please use command :-  dotnet reference add Domain

Set Up Dotnet Ef Tool
----------------------
1. Use command "dotnet tool list --global" to list global tools.
2. Check if "dotnet-ef" tool is installed globally.
3. Use command "dotnet ef migrations add <name> -p <Project where DBContext is (Persistence in our case)> -s <Startup Project (API inour case)>
4. The above command will 
Set Up Domain And DB Context and DI Layer
-----------------------------------------
1. Create a Domain class "Activity" in Domain Class Lib. This class will be the target DB Class using the EF Migration Strategy
2. Create a DataContext class extending the DBContext base class to create a session with DB and create query and save entities with DB.
3. In "Startup.cs" class of "API" WebAPI inject the DBContext class (DataContext) in ConfigureServices method. Use SQLite as the DB     provider and use DefaultConnection Connection string. 
4. Configure connection string in "appsettings.Development.json" file.
5. Create Service Provider Scope and use Service Locator Pattern to locate "DataContext" DBContext class injected in "Startup.cs" file mentioned above.
6. Retrieve the Database from context and run any pending Migrations on the DB.

Create a Seed Class to inject data into the Database
----------------------------------------------------
1. Create a Seed Entity class top instantiate a list of Activities in case there is none.
2. Invoke the SeedData method to save all changes to the database. 

Create a APIController
-----------------------
1. Create a BaseAPIController class containing common attributes.
2. Creating specific controllers by inheriting from BaseAPIController.

Push Content in the GIT Repo
----------------------------
1. Initialize the Repo by using "git init"
2. Create a DotNet Core specific .gitignore file by using :- dotnet new gitignore
3. 