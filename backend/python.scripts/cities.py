"""from datapackage import Package

package = Package('https://datahub.io/core/world-cities/datapackage.json')

# print list of all resources:


# print processed tabular data (if exists any)
def allData():
    for resource in package.resources:
        if resource.descriptor['datahub']['type'] == 'derived/csv':
            print(resource.read)

allData()
"""
