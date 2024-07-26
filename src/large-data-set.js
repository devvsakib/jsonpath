export const dummyData = {
    "event": {
        "target": [
            {
                "firstName": "sakib",
                "lastName": "ahmed",
                "role": "eat and sleep"
            },
            {
                "displayName": "test-1"
            }
        ],
    },
    "fetchers": {
        "id": "bd8ef67d-5d6d-4d13-aacb-b317a050db26",
        "type": "fetcher",
        "client": [
            {
                "firstName": "sakib",
                "lastName": "ahmed",
                "role": "eat and sleep"
            },
            {
                "displayName": "test-1"
            }
        ],
        "data": {
            "integrationDetails": {
                "integration_type": "aws",
                "integration_id": null
            },
            "infoData": {
                "_id": "64ff6326b76d19630a0a84f6",
                "resource_type": "fetcher",
                "name": "AWS-EC2-Get-Unused-Security-Groups",
                "arn": "arn:fetcher:e16bef29e64157d797ca9f5d345b0c95:aws-ec2-get-unused-security-groups",
                "root_user_id": "amit@shunyeka.com",
                "user_id": "amit@shunyeka.com",
                "clients": [
                    "ec2"
                ],
                "code": "import traceback\n\n\ndef get_security_groups(ec2_client, maxResults=10) -> list:\n    securityGroups = []\n    response = ec2_client.describe_security_groups(MaxResults=maxResults)\n    if 'SecurityGroups' in response:\n        securityGroups.extend(response['SecurityGroups'])\n\n    while 'NextToken' in response:\n        response = ec2_client.describe_security_groups(NextToken=response['NextToken'],MaxResults=maxResults)\n        if 'SecurityGroups' in response:\n            securityGroups.extend(response['SecurityGroups'])\n    return securityGroups\n\ndef get_network_interfaces(ec2_client, maxResults=5) -> list:\n    network_interfaces = []\n    response = ec2_client.describe_network_interfaces(MaxResults=maxResults)\n    if 'NetworkInterfaces' in response:\n        network_interfaces.extend(response['NetworkInterfaces'])\n    \n    while 'NextToken' in response:\n        response = ec2_client.describe_network_interfaces(NextToken= response['NextToken'],MaxResults=maxResults)\n        if 'NetworkInterfaces' in response:\n            network_interfaces.extend(response['NetworkInterfaces'])\n    return network_interfaces\n\ndef get_unused_security_groups(security_groups: list, network_interfaces: list) -> list:\n    used_security_groups = set()\n    for network_interface in network_interfaces:\n        for sg in network_interface['Groups']:\n            used_security_groups.add(sg['GroupId'])\n    return [sg for sg in security_groups if sg['GroupId'] not in used_security_groups]\n\ndef set_id_and_name(result: list) -> None:\n    for r in result:\n        r['id'] = r['GroupId']\n        r['name'] = r['GroupName']\n        r['test-int-in-between'] = 7\n\n\nasync def fetch(clients, test=False):\n    ec2_client = clients['ec2']\n    security_groups = get_security_groups(ec2_client)\n    network_interfaces = get_network_interfaces(ec2_client)\n    unused_security_groups = get_unused_security_groups(security_groups, network_interfaces)\n    set_id_and_name(unused_security_groups)\n    return unused_security_groups",
                "created_at": "2023-09-11T18:57:42.779000",
                "is_global": false,
                "updated_at": "2024-01-04T11:41:57.718000",
                "integration_type": "aws1",
                "data_schema": null,
                "data_keys": [
                    {
                        "name": "Description",
                        "type": "str"
                    },
                    {
                        "name": "GroupName",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissions",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissions.IpProtocol",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissions.IpRanges",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissions.Ipv6Ranges",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissions.PrefixListIds",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissions.UserIdGroupPairs",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissionsUserIdGroupPairs.GroupId",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissionsUserIdGroupPairs.UserId",
                        "type": "str"
                    },
                    {
                        "name": "OwnerId",
                        "type": "str"
                    },
                    {
                        "name": "GroupId",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissionsEgress",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissionsEgress.IpProtocol",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissionsEgress.IpRanges",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissionsEgressIpRanges.CidrIp",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissionsEgress.Ipv6Ranges",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissionsEgress.PrefixListIds",
                        "type": "list"
                    },
                    {
                        "name": "IpPermissionsEgress.UserIdGroupPairs",
                        "type": "list"
                    },
                    {
                        "name": "VpcId",
                        "type": "str"
                    },
                    {
                        "name": "id",
                        "type": "str"
                    },
                    {
                        "name": "name",
                        "type": "str"
                    },
                    {
                        "name": "test-int-in-between",
                        "type": "int"
                    },
                    {
                        "name": "region",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissions.FromPort",
                        "type": "int"
                    },
                    {
                        "name": "IpPermissionsIpRanges.CidrIp",
                        "type": "str"
                    },
                    {
                        "name": "IpPermissions.ToPort",
                        "type": "int"
                    },
                    {
                        "name": "Tags",
                        "type": "list"
                    },
                    {
                        "name": "Tags.Key",
                        "type": "str"
                    },
                    {
                        "name": "Tags.Value",
                        "type": "str"
                    }
                ],
                "type": "code"
            },
            "parameterDetails": []
        }
    }
}