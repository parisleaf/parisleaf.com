Stores
======

Where `item` is a resource:

`ItemStore.getItems()` should correspond to `ItemActions.getItems()`, which in turn corresponds to `GET /api/items`.

`getItems()` should have one parameter, `query`, which is a hash of GET query parameters. The default is an empty map (no parameters).

So, every call to `getItems()` should map directly to a call to `GET /api/items`. Generally, every retrieval operation operation should map to a REST operation, including filtering.

Items should be cached in the Store, as well as a map of queries to items.
