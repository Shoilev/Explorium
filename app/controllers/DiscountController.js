import firebase from 'react-native-firebase';
import { Discount  } from '../settings/global.json';
import { isEmpty } from '../helpers/index.js';

export const getDiscount = (storeDiscount, userUID, userAchievements, locationCity, landmarksCount) => {
  return getDiscountInfo(locationCity).then((discountInfo)=> {
    if(isEmpty(discountInfo)) {
      return {render: false};
    }

    let userExplorePercent = Math.floor((userAchievements.achievements.length / landmarksCount) * 100);

    if(userExplorePercent < Discount.explorePercentRate) {
      return {
        discountInfo,
        render: true,
        userExplorePercent: userExplorePercent || 0
      }
    } else {
      if(storeDiscount) {
        const db = firebase.firestore().collection('users').doc(userUID);

        return db.get().then(doc => {
          if (doc.exists && 
              (isEmpty(doc.data().discounts) || 
              (!isEmpty(doc.data().discounts) && isEmpty(doc.data().discounts.find(discount=>!isEmpty(discount[locationCity])))))
          ) {
            const validPeriod = new Date(Date.now() + (Discount.validHoursPeriod*60*60*1000)); // convert hours to miliseconds
            let storeDiscount = {
              [locationCity]: {
                discounts: discountInfo,
                validPeriod
              }
            }

            db.update({
              discounts: firebase.firestore.FieldValue.arrayUnion(storeDiscount)
            });

            return {
              discountInfo,
              validPeriod,
              render: true
            };
          }

          return {
            render: false
          }
        });
      }
    }
  });
}

export const getDiscountInfo = (locationCity) => {
  return firebase.firestore().collection('businesses').doc('discounts').collection(locationCity).get().then(querySnapshot => {
    let possibleDiscounts = [];

    querySnapshot.forEach( doc => {
      let data = doc.data();
      possibleDiscounts.push(data);
    });

    return possibleDiscounts;
  }).catch(e => {
    return [];
  })
}
