(function () {

    'use strict';

    angular.module('ngRemote', []);

    angular

        .module('ngRemote')

        .config(['$provide', 'ngRemote.remoteObjectsDictionary',
            function ($provide, remoteObjectsDictionary) {

                var remoteObjects = remoteObjectsDictionary.objects;
                angular.forEach(remoteObjects, function (remoteObject) {

                    $provide.factory('ngRemote.' + remoteObject + 'Service', [
                        'ngRemote.genericService', function (GenericService) {

                            var model = new remoteObjectsDictionary.namespace[remoteObject]();

                            var service = {
                                retrieve : function(options) {
                                    return GenericService(model).retrieve(options);
                                },
                                retrieveById : retrieveById,
                                retrieveByParentId : retrieveByParentId,
                                retrieveRecentItems : retrieveRecentItems,
                                create : function(record) {
                                    return GenericService(model).create(record);
                                },
                                upsert : function(record) {
                                    return GenericService(model).upsert(record);
                                },
                                update : function(record) {
                                    return GenericService(model).update(record);
                                },
                                del : function(recordId) {
                                    return GenericService(model).del(recordId);
                                }
                            };
                            return service;

                            function retrieveById(recordId) {
                                var options = {
                                    where: {
                                        Id: {
                                            eq: recordId
                                        }
                                    },
                                    limit: 1
                                };
                                return GenericService(model).retrieve(options);
                            }

                            function retrieveByParentId(parentFieldName, recordId, numberOfRecords) {
                                var optionsString = '{' +
                                    '"' + parentFieldName + '"' + ': {' +
                                    '"eq": ' + '"' + recordId + '"' +
                                    '}' +
                                    '}';
                                var options = {
                                    where: {
                                    },
                                    limit: numberOfRecords
                                };
                                options.where = eval('(' + optionsString + ')');
                                return GenericService(model).retrieve(options);
                            }

                            function retrieveRecentItems(numberOfRecentItems) {
                                var options = {
                                    orderby: [
                                        {
                                            LastModifiedDate: 'DESC'
                                        }
                                    ],
                                    limit: numberOfRecentItems
                                };
                                return GenericService(model).retrieve(options);
                            }

                        }]);
                });
            }])

        /**
         * @description generic service which dynamically accesses all four functions for the sObjectModel which is given to it
         * @param sObjectModel RemoteObjectModel
         */
        .factory('ngRemote.genericService', ['$q', function($q) {

            return function(sObjectModel) {

                var service = {
                    retrieve : retrieve,
                    create : create,
                    upsert : upsert,
                    update : update,
                    del : del
                };

                return service;

                function retrieve(options) {
                    var deferred = $q.defer();
                    sObjectModel.retrieve(options,
                        function(error,
                                 records,
                                 event) {
                            if(error) {
                                deferred.reject(error);
                            } else {
                                deferred.resolve(parseObjectToArray(event.result.records));
                            }
                        });
                    return deferred.promise;
                }

                function create(record) {
                    var deferred = $q.defer();
                    sObjectModel.create(record,
                        function(error,
                                 records,
                                 event) {
                            if(error) {
                                deferred.reject(error);
                            } else {
                                deferred.resolve(parseObjectToArray(event.result.records));
                            }
                        });
                    return deferred.promise;
                }

                function upsert(record) {
                    var deferred = $q.defer();
                    sObjectModel._props = record;
                    sObjectModel.upsert(function(error,
                                                 records,
                                                 event) {
                        if(error) {
                            deferred.reject(error);
                        } else {
                            deferred.resolve(parseObjectToArray(event.result.records));
                        }
                    });
                    return deferred.promise;
                }

                function update(record) {
                    var deferred = $q.defer();
                    sObjectModel._props = record;
                    sObjectModel.update(function(error,
                                                 records,
                                                 event) {
                        if(error) {
                            deferred.reject(error);
                        } else {
                            deferred.resolve(parseObjectToArray(event.result.records));
                        }
                    });
                    return deferred.promise;
                }

                function del(recordId) {
                    var deferred = $q.defer();
                    sObjectModel.del(recordId, function(error,
                                                        records,
                                                        event) {
                        if(error) {
                            deferred.reject(error);
                        } else {
                            deferred.resolve(parseObjectToArray(event.result.records));
                        }
                    });
                    return deferred.promise;
                }

                function parseObjectToArray(objectOfObjects) {
                    var records = Object.keys(objectOfObjects).map(function (key) {
                        return objectOfObjects[key];
                    });

                    return records;
                }
            }
        }]);
})();