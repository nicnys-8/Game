/**
A thing for creating things... GAH!
Näämen, den här borde döpas om eller nå.
Alla spelobject sätts fast på den här, t.ex. ObjectFactory.Moving;
det gör att man kan parsa banor lite snyggare i gamestate,
då alla objekttyper kan accessas som properties på det här objektet
*/
var ObjectFactory = ObjectFactory ||  {
    
    // Nåt sånt här kan man också ha, men då måste vi skriva om
    // konstruktÖrerna så att de tar alla parametrar i ett objekt.
    // Alternativt {name:"Nånting", params:{...}}
    createObject : function(description) {
        var constr = this[description.name],
            object = null;
        if (constr) {
            object = new constr(description);
        } else {
            console.warn("Trying to create unknown object " + description.name);
        }
        return object;
    }
};