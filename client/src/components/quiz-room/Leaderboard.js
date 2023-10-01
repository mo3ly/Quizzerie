import { useEffect } from 'react'
import Button from '@/components/Button'

const Leaderboard = ({ method, allAnswers }) => {
    const getTopScores = () => {
        let scores = []
        allAnswers.map(i => {
            if (!scores.some(x => i.user_id == x.user_id)) {
                const userScores = allAnswers
                    .filter(x => i.user_id == x.user_id)
                    .map(y => y.score)
                    .reduce((prev, next) => prev + next)
                scores.push({
                    user_id: i.user_id,
                    name: i.name,
                    scores: userScores,
                })
            }
        })
        // https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
        return scores.sort(function (a, b) {
            return b.scores - a.scores
        })
    }
    return (
        <>
            <div className="flex flex-col h-full bg-purple-pattern min-h-screen select-none">
                <div className="p-5 text-3xl lg:text-5xl text-center font-medium bg-white-pattern font-gluten drop-shadow-md">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
                <div className="text-white h-full max-h-screen w-full overflow-y-auto flex-col justify-center items-center text-center flex-grow flex">
                    <div className="text-3xl font-gluten">Leaderboard</div>
                    <div className="flex flex-col h-64 text-center w-full items-center justify-center space-y-2 my-6">
                        {getTopScores()
                            .slice(0, 10)
                            .map((i, index) => (
                                <div className="p-4 w-1/2 px-3 bg-black bg-opacity-25 inline-flex justify-between items-center font-semibold">
                                    <div>{index + 1}.</div>
                                    <div>{i.name}</div>
                                    <div>{i.scores} Points</div>
                                </div>
                            ))}
                    </div>
                    <Button
                        className="mt-4 bg-gray-pattern"
                        onClick={() => method()}>
                        Exit
                    </Button>
                </div>
            </div>
        </>
    )
}
export default Leaderboard
