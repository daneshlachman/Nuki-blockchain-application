'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Perform operations on a certain lock
 * @param {org.poc.locknetwork.LockActivity} LockActivity - Lock to be opened or closed
 * @transaction
 */

async function LockFunction(LockActivity) {
    currentLock = LockActivity.lock
    currentPerformingUser = LockActivity.performingUser
  
  	userIsAuthorized = false

   // checking if user is authorized, if so changing the lock status
    if (currentLock.authorizedUsers.indexOf(currentPerformingUser) >= 0) {
      userIsAuthorized = true
        if (currentLock.status == "Opened") {
            currentLock.status = "Closed"
        } else {
            currentLock.status = "Opened"
        }
         
    }
   	// updating the asset registry
    let assetRegistry = await getAssetRegistry('org.poc.locknetwork.Lock');
    await assetRegistry.update(currentLock);
  
    // event for changed lock status  
    let factory = getFactory();
    let event = factory.newEvent('org.poc.locknetwork', 'LockStatusEvent');
    event.performingUser = currentPerformingUser
    event.userIsAuthorized = userIsAuthorized
    event.lockStatusAfterOperation = currentLock.status
    emit(event);
}