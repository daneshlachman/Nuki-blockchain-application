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
            .then((result) => {
                titlesRegistry = result;

                let factory = businessNetworkDefinition.getFactory();

                // define "backdoor" lock with user "Danesh Lachman" as an authorized user 
                lock = factory.newResource('org.poc.locknetwork', 'Lock', "1");
                lock.descriptionLock = 'Backdoor';
                lock.status = 'Closed';
                var userRelationship = factory.newRelationship('org.poc.locknetwork', 'User', '1234');
                lock.authorizedUsers = [userRelationship];

                // add lock to registry
                titlesRegistry.addAll([lock]);

            });
    });


