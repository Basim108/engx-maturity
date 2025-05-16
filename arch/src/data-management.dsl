dataManagement = softwareSystem "Data Management System" {
    description "Responsible for collecting EngX data."

    !adrs containers/adrs/data
    
    !include containers/db-engx.dsl
    
    tags DB
}

contributor -> maintainer "Request for Review of Data Changes Proposal" GitHub "Pull Request"
maintainer -> dataManagement.engxDB "Merge Pull Request" GitHub Write

