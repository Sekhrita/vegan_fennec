from influxdb_client import InfluxDBClient
from influxdb_client.client.query_api import QueryApi

bucket = "vegan_fennec"
org = "mai"
token = "sKdnYYYH-dxwZXg23ZB1i4NmjrGIkhiVrJ9GxhXEG0yJPqUxAipUgPAf8_HAPUshJN7t8ftixIxoiyV-rlQFdw=="
url = "http://localhost:8086"

client = InfluxDBClient(url=url, token=token, org=org)
query_api = client.query_api()

def get_soil_moisture_data(start_date, end_date):
    query = f'''
        from(bucket: "{bucket}")
        |> range(start: {start_date.isoformat()}, stop: {end_date.isoformat()})
        |> filter(fn: (r) => r._measurement == "soil_moisture")
    '''
    print(query)
    tables = query_api.query(query)
    results = []
    for table in tables:
        for record in table.records:
            print(record)
            results.append({
                "time": record.get_time(),
                "value": record.get_value(),
                "field": record["_field"],
                "measurement": record["_measurement"],
                "soil_type": record["soil_type"]
            })
    return results

def check_thresholds(data, min_threshold, max_threshold):
    alerts = []
    for record in data:
        if record['value'] < min_threshold or record['value'] > max_threshold:
            alerts.append(record)
    return alerts


