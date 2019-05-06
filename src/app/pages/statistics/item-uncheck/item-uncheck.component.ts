import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { RecordService } from '../../../shared/service/record/record.service';
import { RecordModel } from '../../../shared/model/record.model';

@Component({
  selector: 'ngx-item-uncheck',
  templateUrl: './item-uncheck.component.html',
  styleUrls: ['./item-uncheck.component.scss'],
})
export class ItemUncheckComponent implements OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  legends: string[] = [];
  seriesDatas: {value: number, name: string}[] = [];
  spinner = true;

  constructor(
    private theme: NbThemeService,
    private recordService: RecordService,
  ) {}

  ngOnInit() {
    this.recordService.getRecords().subscribe((records) => {
      this.transferData(records);
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        this.setChart(config);
        this.spinner = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  setChart(config: any): void {
    const colors = config.variables;
    const echarts = config.variables.echarts;

    this.options = {
      backgroundColor: echarts.bg,
      color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight,
        colors.warning, colors.info, colors.danger, colors.success, colors.primary],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.legends,
        textStyle: {
          color: echarts.textColor,
        },
      },
      series: [
        {
          name: '項目',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          data: this.seriesDatas,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: echarts.itemHoverShadowColor,
            },
          },
          label: {
            normal: {
              show : false,
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
          },
        },
      ],
    };
  }

  transferData(data: any): void {
    if (data) {
      this.legends = [];
      this.seriesDatas = [];
      data.forEach(
        (d: RecordModel) => {
          if (d.type === 'expense' && !d.check) {
            const index = this.legends.indexOf(d.description);
            if (index >= 0) {
              this.seriesDatas[index].value = this.seriesDatas[index].value + (d.value * -1);
            } else {
              this.legends.push(d.description);
              this.seriesDatas.push({value: (d.value * -1), name: d.description});
            }
          }
        },
      );
    }
  }
}
