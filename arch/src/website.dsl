website = softwareSystem "Website" {
    description "Website that provides UI to EngX Maturity features"

    tags Website
    
    !include containers/db-user-engx.dsl
    
    backend = container "Website.Backend" {
        
    }
}

user -> website "Add data (rules, practices, etc)" "Specific data that applied in one or several companies"
user -> website "Assess a project" "" ReadWrite
user -> website "View common rules" "For example, code review check list" Read
user -> website "View common check lists" "For example, code review check list" Read
user -> website "Generate specific check lists" "" Write

website.backend -> website.userEngxDB "Save engX data" "" Write
website.backend -> website.userEngxDB "Save check list" "" Write
website.backend -> website.userEngxDB "Save engX assessment results" "" Write

website.backend -> dataManagement.engxDB "Get common check lists" GitHub Read
website.backend -> dataManagement.engxDB "Get common data" GitHub Read