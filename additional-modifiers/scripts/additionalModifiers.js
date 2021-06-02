Hooks.on("init", () => {
    Die.MODIFIERS["rep"] = function replace(modifier) {
        const rgx = /(?:rep|REP)([<>=]+)?([0-9]+),([0-9]+)/;
        const match = modifier.match(rgx);
        
        if (!match){
            return this;
        }

        let [comparison, target, replaceValue] = match.slice(1)
        target = parseInt(target)
        replaceValue = parseInt(replaceValue)
    
        // Replace any results that match the criteria
        const n = this.results.length;
        for ( let i=0; i<n; i++ ) {
            let r = this.results[i];
            if ( DiceTerm.compareResult(r.result, comparison, target) ){
                r.replaced=true;
                r.result=target
            }
        }
    }
})