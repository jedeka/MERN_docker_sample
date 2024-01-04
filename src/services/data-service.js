// Building an es6 singleton  data service

import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service'

let instance = null;
var wishlist = [];
let ns = new NotificationService(); // will refer to the same memory 


class DataService {
    constructor() {
        // link variable instance to this object 
        if(!instance) {
            instance = this; 
        }
        return instance; 
    }

    itemOnWishlist = item => {
        for (var x = 0; x < wishlist.length; x++) {
            if (wishlist[x]._id === item._id) {
                return true;
            }
        }
        return false;
    }
    addWishlistItem = item => {
        wishlist.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
    }

    removeWishlistItem = item => {
        // iterate to find the correct id of the to-be-removed item 
        for(var x = 0; x < wishlist.length; x++){
            if (wishlist[x]._id === item._id){
                wishlist.splice(x, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishlist);
                break;
            }
        }
    }

}

export default DataService;