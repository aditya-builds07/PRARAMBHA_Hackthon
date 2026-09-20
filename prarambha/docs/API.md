# KrishiMitra API

Base URL during local development: `http://localhost:3001/api`

All JSON responses use either `{ "data": ... }` for success or `{ "error": { "code": "...", "message": "..." } }` for errors.

## Reference data

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Service health check |
| GET | `/crops` | Active crop parameters |
| GET | `/assumptions` | Model weights, profiles, disclaimer |
| GET | `/weather?latitude=<lat>&longitude=<lon>` | Normalized current Open-Meteo observation |

`GET /weather` is advisory only. On an unavailable or malformed Open-Meteo response it returns `200` with `data.available: false`, `data.source: "manual_required"`, and no weather classification. The client must let the farmer retain or choose the simulation's `good`, `normal`, or `poor` weather input; forecast failures never silently alter deterministic simulation results.

## Farms

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/farms` | List farms |
| POST | `/farms` | Create a farm |

```json
{
  "name": "Demo Farm",
  "areaAcres": 5,
  "region": "Pune",
  "waterProfile": "canal",
  "availableWaterM3": 10000,
  "budgetInr": 150000
}
```

## Scenarios

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/scenarios?farmId=<id>` | List a farm's scenarios |
| POST | `/scenarios` | Save a scenario |

```json
{
  "farmId": "farm-uuid",
  "name": "Baseline wheat",
  "isBaseline": true,
  "crop": "wheat",
  "areaAcres": 5,
  "waterAvailabilityPercent": 100,
  "weather": "normal",
  "planting": { "type": "on_time", "delayDays": 0 },
  "inputCostMultiplier": 1,
  "irrigation": "flood",
  "priorityProfile": "balanced"
}
```

## Simulation and decisions

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/simulate` | Run deterministic simulation without persistence |
| POST | `/simulate-and-save` | Run a saved scenario and store the result |
| POST | `/simulation-results` | Persist a verified simulation result |
| GET | `/compare?farmId=<id>&scenarioIds=<id1,id2>` | Compare 2–4 saved scenarios |
| POST | `/recommendations` | Produce deterministic recommendations from a verified result |
| GET | `/scenarios/:scenarioId/recommendations` | Retrieve recommendations for a saved scenario's latest result |

`POST /simulate` uses the same scenario input shape as `POST /scenarios`.

```json
{ "scenarioId": "scenario-uuid" }
```

is the body for `POST /simulate-and-save`.

For `POST /recommendations`, send:

```json
{ "simulationResult": { "...": "result from /simulate" }, "scenarioInput": { "...": "optional original input" } }
```

## Resources and history

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/resources?farmId=<id>` | List farm resources |
| POST | `/resources` | Add available budget, water, seed, fertilizer, or other resource |
| GET | `/resources/:farmId/readiness?scenarioId=<id>` | Compare latest result against available budget and water |
| GET | `/farms/:farmId/resources/readiness?scenarioId=<id>` | Compatibility alias for the resource readiness endpoint |
| GET | `/history?farmId=<id>` | List scenarios with their latest stored result |

```json
{
  "farmId": "farm-uuid",
  "resourceType": "water",
  "label": "Canal allocation",
  "availableQuantity": 10000,
  "unit": "m3"
}
```

## Status codes

- `200` successful read or simulation
- `201` record created
- `400` invalid input
- `404` missing crop or scenario
- `409` comparison requested before all scenarios have results
- `500` server or database error
