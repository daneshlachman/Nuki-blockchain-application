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

                // define new user "Danesh Lachman"
                let user = factory.newResource('org.poc.locknetwork', 'User', '1234');
                user.firstName = "Danesh";
                user.lastName = "Lachman";

                // add defined user "Danesh Lachman" to registry
                bizNetworkConnection.getParticipantRegistry('org.poc.locknetwork.User')
                    .then((UserRegistry) => {
                        return UserRegistry.add(user);
                    })

            });
    });


