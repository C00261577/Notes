const key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpteXdkbmpjYXRld2VlcWRhd3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODc3MjUsImV4cCI6MjAxNjA2MzcyNX0.M1LTwSaKtryAjNnnvg1BUnx9orBCUjeMCz62rkJLUhE'

const customDomain ='https://zmywdnjcateweeqdawxs.supabase.co'


import { createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

        // Use a custom domain as the supabase URL
const supabase = createClient(customDomain, key);
const parentEl = document.getElementById('movieList');
const main = async () => {
        let { data, error } = await supabase
        .from('movies-example')
        .select()
        if (error) {
                console.error(error)
                return
        }
        console.log('data', data);
        data.forEach(movie => {
                const movieEl = document.createElement('div');
                movieEl.innerHTML = movie.title;
                parentEl.appendChild(movieEl);
        });
}  
main();
