const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

//config to connect to lock-network
bizNetworkConnection = new BusinessNetworkConnection();
cardName = 'admin@lock-network';
businessNetworkIdentifier = 'businessNetworkIdentifier';

//connect to lock-network with earlier defined network card
bizNetworkConnection.connect(cardName)
    .then((result) => {
        businessNetworkDefinition = result;

        // retrieve registry for lock asset
        bizNetworkConnection.getAssetRegistry('org.poc.locknetwork.Lock')
            .then((registry) => {
                let serializer = businessNetworkDefinition.getSerializer();

                let resource = serializer.fromJSON({
                    '$class': 'org.poc.locknetwork.LockActivity',
                    'lock': '1',
                    'performingUser': '1234'
                });

                return bizNetworkConnection.submitTransaction(resource);
            })


    });


