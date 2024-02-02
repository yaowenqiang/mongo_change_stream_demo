CRM
Email Contact System


Message system

Kafka
MSMQ
Rabbit

Azure Event Hub
Azure Message Bus
Kninesis on Amazon


Akka
Akka.net
Serverless
Azure Functions
Awsk Lambdas
Azure ServiceFabric Actions


oplog
capped collection

tail a capped collection


change stream only works on replica sets

> db.myCollection.aggregate([{'$changestream":{}}"'}])

## Operation Types

+ Insert
+ Update
+ Replace
+ Delete
+ Invalidate ( underline stream is invalidate,)

Invalidate Triggers

+ Drop Collection / Database
+ Rename Collection
+ Permission Change


> db.collection.drop()
> db.dropDatabase()


Pipeline Rules

+ $changeStream must be first stage in pipeline
+ Acceptable Pipeline Stages
  + $match
  + $project
  + $addFields
  + replaceRoot
  + $redact

Multi-Document Stages (not supported)

+ group
+ sort
+ skip
+ limit


Multi-Document Output(not allowed)

+ $unwind


Require 2+ Collection (not supported)

+ $lookup
+ $graphLookup
+ $genNear
+ $text
+ $out
+ $currentOp
+ $collectionStats


Number of Listensers:

1000


get oplog size

> use local
> db.oplog.rs.stats(1000*1000).maxSize
> db.oplog.rs.stats(1000*1000).count
> db.oplog.rs.stats(1000*1000).avgObjSize
> db.printReplicationInfo()













