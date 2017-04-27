# ngRemote

[![deploy to salesforce](https://img.shields.io/badge/salesforce-deploy-blue.svg?style=flat)](https://githubsfdeploy.herokuapp.com)
[![Build Status](https://travis-ci.org/florianhoehn/ngRemote.svg?branch=master)](https://travis-ci.org/florianhoehn/ngRemote)[![Test Coverage](https://codeclimate.com/github/florianhoehn/ngRemote/badges/coverage.svg)](https://codeclimate.com/github/florianhoehn/ngRemote/coverage)
[![Code Climate](https://codeclimate.com/github/florianhoehn/ngRemote/badges/gpa.svg)](https://codeclimate.com/github/florianhoehn/ngRemote)

## Overview

ngRemote is a library for bringing Visualforce Remote Objects and AngularJS together to enable developers to utilise Visualforce Remote Object functionality exposed as AngularJS services for use within your application.

You can find out more about ngRemote at [the project blog here.](https://medium.com/angularjs-visualforce-remoteobjects-joined)

## Usage

### Basic Inclusion

To use ngRemote you should include the Visualforce Component and its associated controller and test class in your Salesforce project. To use the component include it and the AngularJS framework on your page:

```HTML
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.6/angular.min.js"></script>

<c:ngRemote remoteObjectNamespace="RemoteObjectNamespace" 
            remoteObjects="Sobject1,Sobject2,Sobject3" 
            visualforceVariables="true" />
```

The *remoteObjectNamespace* attribute has to match the jsNamespace you define in your <apex:remoteObjects> tag. Match the *remoteObjects* attribute to the jsShorthand of the defined object names for your <apex:remoteObjectModel> (or the default if you defined no shorthand). The *visualforceVariables* attribute is used to enable the use of Visualforce variables ( as {!$User.Id} ) within Angular and defaults to false.

You should inject the ngRemote Angular module into your Angular application.

### Injecting Services

The component will define an Angular service for each object you pass into the *remoteObjects* attribute array named XXXXXService where XXXX is the shorthand passed in. For example the component definition:

```HTML
<c:ngRemote remoteObjectNamespace="TestNamespace" 
            remoteObjects="Account" 
            visualforceVariables="true" />
```
will cause the component to define an AngularJS *AccountService* for you to use. You can then inject this service into the correct places for use in your application.

### Available Methods

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

### Constants

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

A big thanks for helping to improve and promote ngRemote goes to [Lefteris Paraskevas](https://github.com/lefos987) for all his AngularJS expertise and to [Paul Battisson](https://github.com/pbattisson) for using ngRemote and writing most of this README.
