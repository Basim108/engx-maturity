!include styles/colors.dsl

element "Element" {
    fontSize 30
}
relationship "Relationship" {
    fontSize 32
}

element "Cloud" {
    shape Ellipse
    background white
    color ${ORANGE}
    stroke ${ORANGE}
}
element "DB" {
    shape Cylinder
    background white
    color black
    stroke black
    fontSize 36
}
element "Cache" {
    shape Cylinder
    background white
    color black
    stroke red
    fontSize 36
}
element "ElasticSearch" {
    shape Cylinder
    background white
    color black
    stroke blue
    fontSize 36
}
element "Software System" {
}
element "External System" {
    background grey
}
element "Website" {
    shape WebBrowser
}
element "Email" {
    background white
    fontSize 36
}
element "Component" {
    shape Component
}
element "???" {
    background ${LIGHT_RED}
}
relationship "???" {
    color red
}
relationship "Produce" {
    color ${MQ_OPS}
}
relationship "Uses" {
    color ${READ_WRITE}
}
relationship "Read" {
    color ${READ}
}
relationship "Write" {
    color ${WRITE}
}
relationship "ReadWrite" {
    color ${READ_WRITE}
}