import './App.css';
import axios from 'axios';
import Sleep from './utils/bgWorkers';
import { useState } from 'react';
import Loader from './components/loadingComponent';
import RecRow from './components/rowComponents'
import { AgeField, SkillField, PreferenceField } from './components/formComponents';
import { Bubble, ReverseBubble } from './components/chatComponents';

const API_ENDPOINT = "https://vacancyrecommender.up.railway.app/";
const GET_ENDPOINT = "api/recommend";
const POST_ENDPOINT = "api/write/"

function App() {
  const keyHandlers = {
    age: '',
    skill: 'Thank you! Now, please tell us your primary professional skill:',
    preference: 'Great! Tell us a bit more about your job preferences:'
  };
  const [answers, setAnswer] = useState({age: '', skill: '', preference: ''});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoadingState] = useState(false);
  const [action, setAction] = useState(0);
  const [chatHistory, editChatHistory] = useState(['preference','skill','age']);
  const [currentQuestion, setQuestion] = useState('age');
  const [cumReward, setCumerward] = useState(0)
  const [reactedCount, reactedCountUpdate] = useState(0)
  const [chatCache, editChatCache] = useState([
    {
      systext: 'Hello! Welcome to vacancy recommender based on PDQN. Please, state your age:',
      usrtext: null
    }
  ]);

  const registerAnswer = (answer, key) => {
    let new_object = answers
    new_object[key] = answer
    setAnswer(new_object)
  };

  const cacheNewMessage = (message) => {
    editChatCache((prevCache) => ([
        ...prevCache, message
      ])
    )
  };

  const updateHistory = async (answer) => {
    // updating chat history after each request
    let historyCopy = chatHistory
    let current_state = chatHistory.pop()
    let next_state = historyCopy.length > 0 ? historyCopy[historyCopy.length - 1] : null
    cacheNewMessage({systext:null,usrtext:answer})
    editChatHistory(historyCopy);
    setQuestion(next_state)
    if (next_state !== null) {
      cacheNewMessage({systext:keyHandlers[next_state],usrtext:null})
    } else {
      setLoadingState(true)
      get_recommendation()
      await Sleep(2000)
      setLoadingState(false)
    }
  };

  const messageCache = chatCache.map((message) => {
    return <div key={message.id} className='flex flex-col justify-center w-full mt-1'>
      {message.systext !== null &&
          <ReverseBubble key={message.id}  content={message.systext} />
      }
      {message.usrtext !== null &&
          <Bubble key={message.id}  content={message.usrtext} />
      }
    </div>
  });

  const register_change = async (new_value) => {
    registerAnswer(new_value, currentQuestion)
    await updateHistory(new_value)
  };

  // form components dynamic change
  const componentsHandler = {
      age: <AgeField emit_event={register_change} />,
      skill: <SkillField emit_event={register_change} />,
      preference: <PreferenceField emit_event={register_change} />
    };

  const get_recommendation = () => {
    let response = undefined
    if (
      answers.age.length > 0 && answers.skill.length > 0 
      && answers.preference.length > 0
    ) {
      const parameters = {
        age: parseInt(answers.age),
        skill: answers.skill,
        preference: answers.preference
      }
      axios.get(
        API_ENDPOINT+GET_ENDPOINT, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          params: parameters
        }
      ).then(res => {
        response = res.data;
        if (response.status_code === 200) {
          setRecommendations(response.details.recommended)
          setAction(response.details.action)
        } else {
        }
      }).catch(err => {
        console.log(`Unexpected error: ${err}`)
      })
    }
  };

  const registerReward = async () => {
    let response = undefined
    await axios.post(
      API_ENDPOINT+POST_ENDPOINT, {
      cum_reward: cumReward,
      age: parseInt(answers.age),
      skill: answers.skill,
      action: action
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
        response = res.data    
        try {
          console.log(`Success: ${response.status_code}`)
        } catch (err) {
          console.log(`Undefined error: ${err}`)
        }
                    
    }).catch(err => console.log(`Undefined error: ${err}`))
  }

  const handle_reaction = async (reaction) => {
    reactedCountUpdate(reactedCount + 1)
    if (reaction === '👍') {
      setCumerward(cumReward + 1)
    } else {
      setCumerward(cumReward - 1)
    }
    if (reactedCount === recommendations.length-1) {
      await registerReward()
    }
  };

  return (
    <div className="App flex flex-col place-items-center justify-center gap-1 p-1">
      <div className='max-w-[512px] relative h-auto'>
        {
          messageCache
        }
      </div>

      {
        currentQuestion !== null && componentsHandler[currentQuestion]
      }

      {/* recommendations */}
      {recommendations.length > 0 && (loading 
        ? <Loader size='md' /> 
        : <RecRow recommendations={recommendations} pass_emit={async (reaction) => await handle_reaction(reaction)}/>)
      }
    </div> 
  );
};

export default App;
