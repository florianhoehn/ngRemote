/**
* @author Florian Hoehn
* @date 08/12/2014
* @description tests the ngRemoteController class
*/
@isTest
private class ngRemoteController_Test {
  /**
  * @author Florian Hoehn
  * @date 08/12/2014
  * @description tests setting remoteObjectNames via the variable and getting the correct list
  */
  @isTest
  static void ngRemoteController_getRemoteObjectList_HasAllObjects() {
    String expectedRemoteObjectName = 'Account, Contact';

    ngRemoteController controller = new ngRemoteController();
    controller.remoteObjectNames = expectedRemoteObjectName;
    Test.startTest();
      List<String> actualRemoteObjectList = controller.remoteObjectList;
    Test.stopTest();

    for(String actualRemoteObjectName : actualRemoteObjectList) {
      System.assert(expectedRemoteObjectName.contains(actualRemoteObjectName));
    }
  }
}