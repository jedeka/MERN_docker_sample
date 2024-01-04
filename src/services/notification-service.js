// Building an es6 singleton global variable for notification service 
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

/*
Observers array will look like below object:
var observers = {
    "wishlistChanged": [{observer:componentName, callback:functionName}, {observer:otherComponentName, callback:otherFunctionName}, ...]
    "userHasLoggedIn": [{observer:componentName, callback:functionName} ...]
}

Learn more about observers pattern for software engineering later
*/
let observers = {};  
let instance = null;

class NotificationService {
    constructor() {
        if(!instance) {
            instance = this; 
        }
        return instance; 
    }
    
    addObserver = (notifName, observer, callback) => {
        let obs = observers[notifName];
        
        if (!obs) {
            // create new notification if it isn't previously created 
            observers[notifName] = []; 
        }

        let obj = {observer: observer, callback: callback}; 
        observers[notifName].push(obj);

    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for (var x = 0; x < obs.length; x++){
            var obj = obs[x];
            obj.callback(data); // Q: what's this? how can and why we call the callback like this?
        }        
    }
    
    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];
        
        if (obs) {
            // iterate to find the correct id of the to-be-removed notification 
            for(var x = 0; x < obs.length; x++){
                // `===` compares if both the parameters and the variable are the same object in the memory 
                if (observer === obs[x].observer){
                    obs.splice(x, 1);
                    observers[notifName] = obs;
                    break; 
                }
            }
        }
    }

}

export default NotificationService;