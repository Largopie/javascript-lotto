import { PRIZE, RANK } from '../../../constant/constants';
import Lotto from '../../../domain/lotto';
import LottoMachine from '../../../domain/lottoMachine';
import Statistics from '../../../domain/statistics';
import WinningLotto from '../../../domain/winningLotto';
import { validateCost } from '../../../utils/validation';
import { $, $$ } from '../utils/dom';

export default class EventController {
  #cost;
  #lottoMachine;
  #winningLotto;

  onSubmitBuyForm(event) {
    event.preventDefault();
    this.#cost = Number(event.target[0].value);

    try {
      validateCost(this.#cost);
    } catch ({ message }) {
      $('.input-error').innerText = message;
      $('.input-error').style.visibility = 'visible';
      return;
    }

    this.#lottoMachine = new LottoMachine(this.#cost);
    const lottos = this.#lottoMachine.getLottoNumbers;
    const buyCount = this.#lottoMachine.getLottoCount;

    const lottoQuery = lottos
      .map((numbers) => `<li><span class="ticket-icon">🎟️</span>${numbers.join(', ')}</li>`)
      .join('');

    $('#total-buy-text').innerText = `총 ${buyCount}개를 구매하였습니다.`;
    $('#lotto-tickets-container ul').innerHTML = lottoQuery;
    $('.input-error').style.visibility = 'hidden';
    $('#step2').style.visibility = 'visible';
    $$('.lotto-number')[0].focus();
  }

  handleWinningLottoForm(event) {
    event.preventDefault();
    const winningNumbersInput = $$('.lotto-number');
    const bonusNumberInput = Number($('.bonus-number').value);
    const winningNumbers = [];

    winningNumbersInput.forEach((element) => winningNumbers.push(Number(element.value)));

    try {
      this.#winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumberInput);
    } catch ({ message }) {
      $$('.input-error')[1].style.visibility = 'visible';
      $$('.input-error')[1].innerText = message;
      return;
    }
    const lottos = this.#lottoMachine.getLottoNumbers;
    const winningLotto = this.#winningLotto.getLottoNumbers;
    const bonusNumber = this.#winningLotto.getBonusNumber;
    const cost = this.#cost;
    const statistics = new Statistics({ lottos, winningLotto, bonusNumber, cost });
    const result = statistics.getResult;

    $$('.input-error')[1].style.visibility = 'hidden';
    $('#modal-container').style.visibility = 'visible';

    const statisticsQuery = `
      <tr>
        <td>3개</td>
        <td>${PRIZE[RANK.fifth].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.fifth]}개</td>
      </tr>
      <tr>
        <td>4개</td>
        <td>${PRIZE[RANK.fourth].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.fourth]}개</td>
      </tr>
      <tr>
        <td>5개</td>
        <td>${PRIZE[RANK.third].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.third]}개</td>
      </tr>
      <tr>
        <td>5개 + 보너스볼</td>
        <td>${PRIZE[RANK.second].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.second]}개</td>
      </tr>
      <tr>
        <td>6개</td>
        <td>${PRIZE[RANK.first].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.first]}개</td>
      </tr>
    `;
    $('#statistics tbody').innerHTML = statisticsQuery;
    $('#profit').innerHTML = `당신의 총 수익률은 ${statistics.getProfit}%입니다.`;
  }
}
