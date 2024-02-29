export default function WinningLottoForm() {
  const form = document.createElement('form');
  form.setAttribute('id', 'winning-lotto-form');

  // 당첨 번호 입력
  const winningLottoInputContainer = document.createElement('div');
  winningLottoInputContainer.setAttribute('id', 'winning-lotto-input-container');

  const winningNumbersInputContainer = document.createElement('div');
  winningNumbersInputContainer.classList.add('number-input-container');

  const winningNumbersLabel = document.createElement('label');
  winningNumbersLabel.classList.add('winning-number-label');
  winningNumbersLabel.innerText = '당첨 번호';

  const winningNumbersInputSection = document.createElement('section');
  winningNumbersInputSection.setAttribute('id', 'winning-numbers-input');

  Array.from({ length: 6 }).forEach(() => {
    const numberInput = document.createElement('input');
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('required', 'required');
    numberInput.setAttribute('min', '1');
    numberInput.setAttribute('max', '45');
    numberInput.classList.add('number-input');
    numberInput.classList.add('lotto-number');

    winningNumbersInputSection.appendChild(numberInput);
  });

  winningNumbersInputContainer.appendChild(winningNumbersLabel);
  winningNumbersInputContainer.appendChild(winningNumbersInputSection);

  // 보너스 숫자 입력
  const bonusNumberContainer = document.createElement('div');
  bonusNumberContainer.setAttribute('id', 'bonus-number-container');
  bonusNumberContainer.classList.add('number-input-container');

  const bonusNumberLabel = document.createElement('label');
  bonusNumberLabel.classList.add('winning-number-label');
  bonusNumberLabel.innerText = '보너스 번호';

  const bonusNumberInput = document.createElement('input');
  bonusNumberInput.setAttribute('type', 'number');
  bonusNumberInput.setAttribute('required', 'required');
  bonusNumberInput.classList.add('number-input');
  bonusNumberInput.classList.add('bonus-number');

  bonusNumberContainer.appendChild(bonusNumberLabel);
  bonusNumberContainer.appendChild(bonusNumberInput);

  // 에러 메시지
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('input-error');

  // 결과 확인하기 버튼
  const submitResult = document.createElement('input');
  submitResult.setAttribute('id', 'submitResult');
  submitResult.setAttribute('type', 'submit');
  submitResult.setAttribute('value', '결과 확인하기');

  // 합치기
  winningLottoInputContainer.appendChild(winningNumbersInputContainer);
  winningLottoInputContainer.appendChild(bonusNumberContainer);
  form.appendChild(winningLottoInputContainer);
  form.appendChild(errorMessage);
  form.appendChild(submitResult);

  return form;
}
