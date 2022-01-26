This Project is used to create .Net Core API with React Front End.
Testing on 26-01-2021
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
4. The above command will create the 
Set Up Domain And DB Context and DI Layer
-----------------------------------------
1. Create a Domain class "Activity" in Domain Class Lib. This class will be the target DB Class using the EF Migration Strategy
2. Create a DataContext class extending the DBContext base class to create a session with DB and create query and save entities with DB.
3. In "Startup.cs" class of "API" WebAPI inject the DBContext class (DataContext) in ConfigureServices method. Use SQLite as the DB     provider and use DefaultConnection Connection string. 
4. Configure connection string in "appsettings.Development.json" file.
5. Create Service Provider Scope and use Service Locator Pattern to locate "DataContext" DBContext class injected in "Startup.cs" file mentioned above in Program.cs file.
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
2. Create a DotNet Core specific .gitignore file by using :- dotnet new gitignore . This will contain all the necessary file exclusions
3. Clone the directory.
4. Review the files and add them to staging area and commit and push

Create a Feature Branch For Development
---------------------------------------
1. Create a Feature Branch for Development


Client Front End
-------------------
1. Create React project with Typescript template
   npx create-react-app clientfrontend -template typescript
2. Create tsx files to encapsulate Component code. Use Interface pattern to define Props and enable strict type checking in 
   the parent component . E.g. :- Apps and Activities Components
3. Introduce React Semantic UI package. Steps to integrate the same :-
   i) npm install semantic-ui-react semantic-ui-css
   ii) import 'semantic-ui-css/semantic.min.css' in "index.tsx" file.
4. Created an API Helper file containing the CRUD operation using Generics Data Type. Core operations are exposed and promise is       returned.
5. Created a delay functionality to mimic actual REST API call and demonstrate the Loader functionality.
6. Installed "uuid" npm package to create random Activity Id while creating entities. In case issues appear with Typescript, please follow the suggestion provided by VS Code Wizard and install the Typescript types definition file.

Install Central State Management Using Mobx
-------------------------------------------
1. In "clientfrontend" use :- npm i mobx mobx-react-lite
2. Create an ActivityStore which contains the following observables :- activities,activity,isDisplayCreateForm and isLoading.
3. Also create the Action methods.
4. Create the store interface which consists o fall the observables and create a context of the store (createContext).
5. Create the useContext wrapper.
6. Go to index.tsx file and wrap App component inside the following node :-
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>
    This will inject the StoreContext to the Root Component and all its child component heirarchy.
4. Refactor the components to now use observor and use the context of the store mentioned in Step 5. above to use the observables and the actions.


Create Mediator Service Pattern
--------------------------------
In order to achive Clean Architecture Pattern and CQRS (Command Response Segregation) we will need to implement the "Mediator" Pattern.
With this pattern, the Controller layer will forward the request for processing to the concerned Mediator Handler Layer
residing in the Business Layer. The Mediator Handler Layer will be injected via the Service DI Layer on Application Startup.
Steps :-
1. Add "MediatR.Extensions.Microsoft.DependencyInjection" Nuget package in "Applications" and "API" projects.
2. Create the Mediator Layer in "Applications" Project.
3. Rewrite the code in Controller Layer to forward the request to the Mediator Handler using the Query Pattern (IRequest marker Interface).
4. Inject the MediatR assembly in the "Startup.cs" file in the ConfigureServices method.
5. In the BaseAPIController file get the Injected MediatorService from the Service Deependency and the singleton will serve as
   the Mediator for all the controllers. 
   protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

Create CRUD Functionalities in ActivityController and implement AutoMapper
--------------------------------------------------------------------------
Created CRUD functionality in Activity Controller by implementing :-
1. CreateActivity - Create Activity Endpoint
2. EditActivity - Edit Activity Endpoint
3. DeleteActivity - Delete Activity Endpoint

Also created AutoMapper Service through the following :- 
1. Injected Dependency of AutoMapper Assembly in ConfigureServices method of StartUp.cs :-
   services.AddAutoMapper(typeof(MappingProfiles).Assembly);
2. Created MappingProfiles class in Application Layer.
3. Injected IMapper dependency in MediatR layer and invoking Map method. 
