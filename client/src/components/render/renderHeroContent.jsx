import HeroLoading from "../util/heroLoadingComponent";
import HeroBase from "../HeroComponent";
import HeroError from "../util/heroErrorComponent";

export default function RenderHeroContent ({ dealsArr, interval, loading, error }) {
    
    if (error) {
        return (
            <HeroError err={error} />
        )
    };

    if (loading) {
        return (
            <HeroLoading />
        )
    }

    return (
        <HeroBase deals={dealsArr} intervalMs={interval} />
    );
}