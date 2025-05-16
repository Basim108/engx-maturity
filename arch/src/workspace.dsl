workspace {
    !identifiers hierarchical

    name "Engineering Excellence Maturity"

    model {
        !include ubiquitous_language.dsl
        
        user = person "Customer" "A customer user that receives EngX Maturity service."
        contributor = person "EngX Contributor" "Any specialist in dev, qa, ba, pm, etc."
        maintainer = person "EngX Product Owner" "A GitHub repository maintainer."

        !include data-management.dsl
        !include website.dsl
    }

    views {                
        theme default

        !include views.dsl

        styles {
            !include styles.dsl
        }
    }
}