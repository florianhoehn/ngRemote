#ngRemote

##Overview

ngRemote is a library for bringing together Visualforce Remote Objects and AngularJS to enable developers to utilise Visualforce Remote Object functionality exposed as AngularJS services for use within your application.

You can find out more about ngRemote at [the project blog here.](https://medium.com/angularjs-visualforce-remoteobjects-joined)

##Usage

###Basic Inclusion

To use ngRemote you should include the Visualforce Component and its associated controller and test class in your Salesforce project. To use the component include it and the AngularJS framework on your page:

```HTML
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"></script>

<c:ngRemote remoteObjectNamespace="RemoteObjectNamespace" remoteObjects="Sobject1,Sobject2,Sobject3" visualforceVariables="true" />
```

The *remoteObjectNamespace* attribute should match the jsNamespace you define in your <apex:remoteObjects> tag. Match the *remoteObjects* attribute to the jsShorthand defined object names for your <apex:remoteObjectModel> (or the default if you defined no shorthand). The *visualforceVariables* attribute is used to enable the use of Visualforce variables within Angular and defaults to false.

You should inject the ngRemote Angular module into your Angular module.

###Injecting Services

The component will define an Angular service for every object you pass into the *remoteObjects* attribute array named XXXXXService where XXXX is the shorthand passed in. For example the component definition:

```HTML
<c:ngRemote remoteObjectNamespace="TestNamespace" remoteObjects="Account" visualforceVariables="true" />
```
will cause the component to define an AngularJS *AccountService* for you to use. You can then inject this service into the correct places for use in your application.

###Available Methods

The service defined for you will contain the following methods for use:
- retrieve
- retrieveById
- retrieveByParentId
- retrieveRecentItems
- create
- update
- upsert
- delete

Each method returns a promise which you can then handle and manage. Some example method signatures/calls for our AccountService are:

```javascript
AccountService.retrieve({where: {Name: {eq: 'Acme'}}}); //Uses standard VF Remote Objects JSON filters
AccountService.retrieveById(accountId);
AccountService.retrieveByParentId(parentFieldName, recordId, numberOfRecords);
AccountService.retrieveRecentItems(numberOfRecentItems);
AccountService.create(accountRecord);
AccountService.update(accountRecord);
AccountService.upsert(accountRecord);
AccountService.delete(accountRecord);
```

###Constants

You can inject the Visualforce constant set to obtain access to the following Visualforce globals/constants:

```javascript
User.Id //{!$User.Id}
User.FirstName //{!$User.FirstName}
User.LastName //{!$User.LastName}
User.Alias //{!$User.Alias}
User.Title //{!$User.Title}
CurrentPage.Name //{!$CurrentPage.Name}
CurrentPage.Url //{!$CurrentPage.Url}
Profile.Id //{!$Profile.Id}
Profile.Name //{!$Profile.Name}
```

A big thanks for helping to improve and promote ngRemote goes to [Lefteris Paraskevas](https://github.com/lefos987) for all his AngularJS expertise and to [Paul Battisson](https://github.com/pbattisson) for using ngRemote and helping to write this README.